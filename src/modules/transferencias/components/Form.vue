<template>
  <v-form id="formTransferencia" class="pa-4 full-width">
    <v-row>
      <v-col md="2" cols="12">
        <input hidden v-model="form.id_transferencia" />
        <v-text-field label="Data" v-model="form.data" class="obr" hide-details outlined dense type="date" ref="edtData"
          @change="calcularPontosDisponiveis()"></v-text-field>
      </v-col>
      <v-col md="5" cols="12">
        <v-autocomplete :items="origens" v-model="id_origem_parceiro_ou_cartao" item-text="nome"
          item-value="id_origem_parceiro_ou_cartao" label="Origem" dense outlined hide-details class="obr"
          @change="calcularPontosDisponiveis"></v-autocomplete>
      </v-col>
      <v-col md="5" cols="12">
        <v-autocomplete :items="destinos" v-model="form.id_parceiro_destino" item-text="nome" item-value="id_parceiro"
          label="Destino" dense outlined hide-details class="obr"></v-autocomplete>
      </v-col>
      <v-col md="2" cols="12">
        <v-text-field label="Pontos Disponíveis" :value="pontosDisponiveis" class="obr" hide-details outlined dense
          disabled :loading="loadingPontosDisponiveis"></v-text-field>
      </v-col>
      <v-col md="2" cols="12">
        <vuetify-money label="Pontos p/ transferência" v-model="form.pontos" class="obr" hide-details outlined dense
          :options="{
            locale: 'pt-BR',
            precision: 0,
          }"></vuetify-money>
      </v-col>
      <v-col md="2" cols="12">
        <vuetify-money label="Bônus (%)" v-model="form.percentual_bonus" hide-details outlined dense :options="{
          locale: 'pt-BR',
          precision: 0,
        }"></vuetify-money>
      </v-col>
      <v-col md="2" cols="12">
        <v-text-field label="Total pontos" :value="totalPontos" hide-details outlined dense type="number"
          disabled></v-text-field>
      </v-col>
      <v-col md="2" cols="12">
        <v-text-field label="Dias Crédito" v-model="form.dias_credito" class="obr" hide-details outlined dense
          type="number"></v-text-field>
      </v-col>
      <v-col md="2" cols="12">
        <v-text-field label="Dias Créd. Bônus" v-model="form.dias_credito_bonus" hide-details outlined dense class="obr"
          type="number"></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-8">
      <v-spacer></v-spacer>
      <v-btn @click="onClickCancelar" color="primary" outlined class="mr-2">Cancelar</v-btn>
      <v-btn @click="onClickSalvar" color="primary">Salvar</v-btn>
    </v-row>
  </v-form>
</template>

<script>
import service from "@/modules/transferencias/services/transferencias.service";
import { validarObr, sanitizarDadosForm, validarData } from "@/js/util";

export default {
  name: "Form",

  components: {},

  props: {
    id_transferencia: {
      type: Number,
      default: undefined,
    },
  },

  data() {
    return {
      form: {
        data: undefined,
        pontos: 0,
        id_cartao_origem: undefined,
        id_parceiro_origem: undefined,
        id_parceiro_destino: undefined,
        percentual_bonus: 0,
        dias_credito: undefined,
        dias_credito_bonus: undefined,
      },
      origens: [],
      destinos: [],
      id_origem_parceiro_ou_cartao: undefined,
      listaPontosDisponiveis: {
        data: "",
        lista: [],
      },
      loadingPontosDisponiveis: false,
    };
  },

  async beforeMount() {
    try {
      const parceiros = await service.getParceiros();
      const cartoes = await service.getCartoes();

      this.setOrigens(cartoes, parceiros);
      this.setDestinos(parceiros);

      if (this.id_transferencia) {
        await this.getTransferencia(this.id_transferencia);
      }
    } catch (error) {
      this.$notify.error("Ocorreu um erro desconhecido");
    }
  },

  computed: {
    isEdicao() {
      return this.id_transferencia ? true : false;
    },

    totalPontos() {
      return Math.round(this.form.pontos * (this.form.percentual_bonus / 100 + 1));
    },

    origem() {
      return this.origens.find((origem) => origem.id_origem_parceiro_ou_cartao === this.id_origem_parceiro_ou_cartao);
    },

    destino() {
      return this.destinos.find((destino) => destino.id_parceiro === this.form.id_parceiro_destino);
    },

    pontosDisponiveis() {
      if (this.listaPontosDisponiveis.lista.length === 0) return 0;

      const localizado = this.listaPontosDisponiveis.lista.find((parceiroOuCartao) => {
        if (`parceiro_${parceiroOuCartao.id}` === this.id_origem_parceiro_ou_cartao && parceiroOuCartao.is_cartao === 'N') {
          return true;
        }
        else if (`cartao_${parceiroOuCartao.id}` === this.id_origem_parceiro_ou_cartao && parceiroOuCartao.is_cartao === 'S') {
          return true;
        } else {
          return false;
        }
      });

      return localizado.pontos_disponiveis || 0;
    },
  },

  methods: {
    async calcularPontosDisponiveis() {
      if (!validarData(this.form.data)) return;

      if (this.id_origem_parceiro_ou_cartao === undefined) return;

      if (this.listaPontosDisponiveis.lista.length > 0 && this.listaPontosDisponiveis.data === this.form.data) return;

      this.loadingPontosDisponiveis = true;
      this.listaPontosDisponiveis.data = this.form.data;
      try {
        this.listaPontosDisponiveis.lista = await service.getParceirosMaisCartoes(this.form.data);
      } finally {
        this.loadingPontosDisponiveis = false;
      }
    },

    onClickCancelar() {
      this.$emit("reset");
    },

    setOrigens(cartoes, parceiros) {
      const parceirosValidos = parceiros
        .filter((parceiro) => parceiro.is_cia_aerea === "N")
        .map((parceiro) => {
          const resultado = {
            id_origem_parceiro_ou_cartao: `parceiro_${parceiro.id_parceiro}`,
            id_origem: parceiro.id_parceiro,
            nome: parceiro.nome,
            is_cartao: false,
            pontosDisponiveis: undefined,
          };

          return { ...resultado };
        });

      const cartoesMap = cartoes.map((cartao) => {
        const resultado = {
          id_origem_parceiro_ou_cartao: `cartao_${cartao.id_cartao}`,
          id_origem: cartao.id_cartao,
          nome: cartao.nome,
          is_cartao: true,
          pontosDisponiveis: undefined,
        };

        return { ...resultado };
      });

      this.origens = [...parceirosValidos, ...cartoesMap];
    },

    setDestinos(parceiros) {
      this.destinos = parceiros.filter((parceiro) => parceiro.is_cia_aerea === "S");
    },

    async onClickSalvar() {
      if (!validarObr("#formTransferencia")) return;

      if (!this.form.pontos) {
        this.$notify.error("O campo pontos deve ser preenchido");
        return;
      }

      if (!this.id_transferencia) {
        await this.insert();
      }
    },

    async insert() {
      try {
        this.$store.commit("setLoading", true);

        this.form.id_cartao_origem = this.origem.is_cartao ? this.origem.id_origem : undefined;
        this.form.id_parceiro_origem = !this.origem.is_cartao ? this.origem.id_origem : undefined;

        const form = sanitizarDadosForm(this.form);
        const { id_transferencia } = await service.insertTransferencia(form);

        const item = {
          ...form,
          id_transferencia,
          origem: this.origem.nome,
          destino: this.destino.nome,
          total_pontos: this.totalPontos,
        };
        this.$emit("inserted", item);
      } catch (error) {
        this.$notify.error(error.message);
      } finally {
        this.$store.commit("setLoading", false);
      }
    },
  },
};
</script>
