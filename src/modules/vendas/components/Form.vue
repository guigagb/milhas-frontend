<template>
  <v-form
    id="formVenda"
    class="pa-4 full-width"
  >
    <v-row>
      <v-col
        md="2"
        cols="12"
      >
        <input
          hidden
          v-model="form.id_venda"
        />
        <v-text-field
          label="Data venda"
          v-model="form.data_venda"
          class="obr"
          hide-details
          outlined
          dense
          type="date"
          ref="edtDataVencimento"
          :disabled="desabilitarCampo"
        ></v-text-field>
      </v-col>
      <v-col
        md="4"
        cols="12"
      >
        <v-autocomplete
          :items="ciasAereas"
          v-model="form.id_parceiro"
          item-text="nome"
          item-value="id"
          label="Parceiro"
          dense
          outlined
          hide-details
          :disabled="desabilitarCampo"
        ></v-autocomplete>
      </v-col>
      <v-col
        md="4"
        cols="12"
      >
        <v-autocomplete
          :items="plataformasVendas"
          v-model="form.id_plataforma_venda"
          item-text="nome"
          item-value="id_plataforma_venda"
          label="Plataforma Venda"
          dense
          outlined
          hide-details
        ></v-autocomplete>
      </v-col>
      <v-col
        md="2"
        cols="12"
      >
        <vuetify-money
          label="Milhas disponíveis"
          :value="saldoDisponivel"
          class="obr"
          hide-details
          outlined
          dense
          disabled
          :options="{
            locale: 'pt-BR',
            precision: 0,
          }"
        ></vuetify-money>
      </v-col>
      <v-col
        md="2"
        cols="12"
      >
        <vuetify-money
          label="Qtd. Milhas"
          v-model="form.qtd_milhas"
          class="obr"
          hide-details
          outlined
          dense
          :disabled="desabilitarCampo"
          :options="{
            locale: 'pt-BR',
            precision: 0,
          }"
        ></vuetify-money>
      </v-col>
      <v-col
        md="2"
        cols="12"
      >
        <vuetify-money
          class="obr"
          label="Valor"
          v-model="form.valor"
          hide-details
          outlined
          dense
        ></vuetify-money>
      </v-col>
      <v-col
        md="2"
        cols="12"
      >
        <vuetify-money
          class="obr"
          disabled
          label="Valor Milheiro"
          :value="valorMilheiro"
          hide-details
          outlined
          dense
        ></vuetify-money>
      </v-col>
      <v-col
        md="2"
        cols="12"
      >
        <vuetify-money
          class="obr"
          disabled
          label="Custo Médio Milheiro"
          :value="custoMilheiro"
          hide-details
          outlined
          dense
        ></vuetify-money>
      </v-col>
      <v-col
        md="2"
        cols="12"
      >
        <vuetify-money
          class="obr"
          disabled
          label="Lucro líquido"
          :value="lucroLiquido"
          hide-details
          outlined
          dense
        ></vuetify-money>
      </v-col>
      <v-col
        md="2"
        cols="12"
      >
        <v-text-field
          label="Qtd. CPF's"
          v-model="form.qtd_cpf"
          class="obr"
          hide-details
          outlined
          dense
          type="number"
        ></v-text-field>
      </v-col>
      <v-col
        md="2"
        cols="12"
      >
        <v-text-field
          label="Data recebimento"
          v-model="form.data_recebimento"
          class="obr"
          hide-details
          outlined
          dense
          type="date"
          ref="edtDataRecebimento"
        ></v-text-field>
      </v-col>
      <v-col
        md="2"
        cols="12"
      >
        <v-autocomplete
          :items="itensSimNao"
          v-model="form.recebido"
          label="Recebido"
          dense
          outlined
          hide-details
          class="obr"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row class="mt-8">
      <v-spacer></v-spacer>
      <v-btn
        @click="onClickCancelar"
        color="primary"
        outlined
        class="mr-2"
      >Cancelar</v-btn>
      <v-btn
        @click="onClickSalvar"
        color="primary"
      >Salvar</v-btn>
    </v-row>
  </v-form>
</template>

<script>
import service from "@/modules/vendas/services/vendas.service";
import { validarObr, sanitizarDadosForm } from "@/js/util";

export default {
  name: "Form",

  components: {},

  props: {
    id_venda: {
      type: Number,
      default: undefined,
    },
  },

  data() {
    return {
      form: {
        data_venda: undefined,
        data_recebimento: undefined,
        qtd_milhas: 0,
        qtd_cpf: 0,
        valor: undefined,
        id_plataforma_venda: undefined,
        id_parceiro: undefined,
        recebido: "N",
      },
      parceiros: [],
      plataformasVendas: [],
      itensSimNao: [
        { text: "Sim", value: "S" },
        { text: "Não", value: "N" },
      ],
      custoMilheiro: 0,
    };
  },

  async beforeMount() {
    try {
      this.parceiros = await service.getParceiros();
      this.plataformasVendas = await service.getPlataformasVendas();

      if (this.id_venda) {
        await this.getVenda(this.id_venda);
      }
    } catch (error) {
      this.$notify.error("Ocorreu um erro desconhecido");
    }
  },

  computed: {
    isEdicao() {
      return this.id_venda ? true : false;
    },

    ciasAereas() {
      return this.parceiros.filter((parceiro) => parceiro.is_cia_aerea === "S");
    },

    valorMilheiro() {
      if (!this.form.qtd_milhas) return 0;

      return this.form.valor / (this.form.qtd_milhas / 1000);
    },

    lucroLiquido() {
      const qtdMilheiros = this.form.qtd_milhas / 1000;
      return (this.valorMilheiro - this.custoMilheiro) * qtdMilheiros;
    },

    parceiro() {
      if (!this.form.id_parceiro) return null;
      return this.parceiros.find((parceiro) => parceiro.id === this.form.id_parceiro && parceiro.is_cia_aerea === 'S');
    },

    plataformaVenda() {
      if (!this.form.id_plataforma_venda) return null;

      return this.plataformasVendas.find((plataforma) => plataforma.id_plataforma_venda === this.form.id_plataforma_venda);
    },

    desabilitarCampo() {
      return this.isEdicao ? true : false;
    },

    saldoDisponivel() {
      if (this.isEdicao) return 0;

      if (!this.parceiro) return 0;

      return this.parceiro.pontos_disponiveis;
    },
  },

  methods: {
    onClickCancelar() {
      this.$emit("reset");
    },

    async onClickSalvar() {
      if (!validarObr("#formVenda")) return;

      if (!this.form.qtd_milhas) {
        this.$notify.error("O campo qtd milhas deve ser preenchido");
        return;
      }

      if (!this.form.valor) {
        this.$notify.error("O campo valor deve ser preenchido");
        return;
      }

      if (!this.form.valor) {
        this.$notify.error("O campo qtd CPF's ser preenchido");
        return;
      }

      if (!this.id_venda) {
        await this.insert();
      } else {
        await this.update();
      }
    },

    async getVenda(id_venda) {
      try {
        this.$store.commit("setLoading", true);
        const venda = await service.getVenda(id_venda);

        this.form.data_venda = venda.data_venda;
        this.form.data_recebimento = venda.data_recebimento;
        this.form.qtd_milhas = venda.qtd_milhas;
        this.form.qtd_cpf = venda.qtd_cpf;
        this.form.valor = venda.valor;
        this.form.id_parceiro = venda.id_parceiro;
        this.form.id_plataforma_venda = venda.id_plataforma_venda;
        this.form.recebido = venda.recebido;

        this.custoMilheiro = venda.custo_milheiro;
      } catch (error) {
        this.$notify.error(error.message);
      } finally {
        this.$store.commit("setLoading", false);
      }
    },

    async insert() {
      try {
        this.$store.commit("setLoading", true);
        const form = sanitizarDadosForm(this.form);
        const { id_venda } = await service.insertVenda(form);
        const item = {
          ...form,
          id_venda,
          parceiro: this.parceiro,
          plataforma_venda: this.plataformaVenda,
        };
        this.$emit("inserted", item);
      } catch (error) {
        this.$notify.error(error.message);
      } finally {
        this.$store.commit("setLoading", false);
      }
    },

    async update() {
      try {
        this.$store.commit("setLoading", true);
        const form = sanitizarDadosForm(this.form);

        const venda = await service.updateVenda(this.id_venda, {
          data_recebimento: form.data_recebimento,
          qtd_cpf: form.qtd_cpf,
          id_plataforma_venda: form.id_plataforma_venda,
          valor: form.valor,
          recebido: form.recebido,
        });

        this.$emit("updated", {
          ...venda,
          parceiro: this.parceiro,
          plataforma_venda: this.plataformaVenda,
        });
      } catch (error) {
        this.$notify.error(error.message);
      } finally {
        this.$store.commit("setLoading", false);
      }
    },
  },

  watch: {
    "form.id_parceiro"(id_parceiro) {
      const parceiro = this.parceiros.find((parceiro) => parceiro.id_parceiro === id_parceiro);

      if (!this.isEdicao) {
        this.custoMilheiro = parceiro?.custo_medio_total ?? 0;
      }
    },
  },
};
</script>
