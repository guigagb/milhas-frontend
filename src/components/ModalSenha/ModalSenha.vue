<template>
  <v-dialog
    class="modal-senha"
    v-model="showModal"
    width="400px"
    @click:outside="fecharModal"
  >
    <v-card>
      <v-card-title>Alterar Senha</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Senha atual"
              v-model="senhaAtual"
              class="obr"
              hide-details
              outlined
              dense
              maxlength="20"
              :type="senhaAtualVisivel ? 'text' : 'password'"
              :append-icon="senhaAtualVisivel ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              @click:append="senhaAtualVisivel = !senhaAtualVisivel"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Nova senha"
              v-model="senhaNova"
              class="obr"
              hide-details
              outlined
              dense
              maxlength="20"
              :type="senhaNovaVisivel ? 'text' : 'password'"
              :append-icon="senhaNovaVisivel ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              @click:append="senhaNovaVisivel = !senhaNovaVisivel"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Repetir nova senha"
              v-model="senhaNovaRepeticao"
              class="obr"
              hide-details
              outlined
              dense
              maxlength="20"
              :type="senhaNovaRepeticaoVisivel ? 'text' : 'password'"
              :append-icon="senhaNovaRepeticaoVisivel ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              @click:append="senhaNovaRepeticaoVisivel = !senhaNovaRepeticaoVisivel"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="fecharModal()">Cancelar</v-btn>
        <v-btn
          color="primary"
          @click="alterarSenha()"
        >Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiEyeOutline, mdiEyeOffOutline } from "@mdi/js";
import serviceSenha from './senha.service';

export default {
  name: 'ModalSenha',

  props: {
    show: {
      type: Boolean,
      default: false,
    }
  },

  watch: {

    show(value) {
      this.showModal = value;

      if (value) {
        this.limparCampos();
      }
    }

  },

  data() {
    return {
      showModal: false,
      senhaAtual: '',
      senhaNova: '',
      senhaNovaRepeticao: '',
      senhaAtualVisivel: false,
      senhaNovaVisivel: false,
      senhaNovaRepeticaoVisivel: false,
      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
    };
  },
  methods: {
    limparCampos() {
      this.senhaAtual = '';
      this.senhaNova = '';
      this.senhaNovaRepeticao = '';
    },
    fecharModal() {
      this.$emit('fechar');
    },
    async alterarSenha() {

      if (this.senhaNova !== this.senhaNovaRepeticao) {
        return this.$notify.error("senha nova não confere com a senha repetida");
      }

      try {

        await serviceSenha.alterarSenha({
          senhaAtual: this.senhaAtual,
          senhaNova: this.senhaNova,
        });

        this.$notify.success('senha alterada com sucesso');
        this.fecharModal();

      } catch (error) {
        this.$notify.error(error.message);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-senha {
  width: 100px;
}
</style>