<template>
  <div>
    <v-navigation-drawer
      :mini-variant="!isDrawerOpen"
      :floating="!isDrawerOpen"
      app
      width="260"
      class="app-navigation-menu"
      :permanent="$vuetify.breakpoint.mdAndUp"
      :temporary="$vuetify.breakpoint.smAndDown"
      :absolute="$vuetify.breakpoint.smAndDown"
      :value="isDrawerOpen"
      @input="val => $emit('update:is-drawer-open', val)"
    >
      <!-- Navigation Header -->
      <template
        v-if="isDrawerOpen"
        #prepend
      >
        <div class="nav-info-estabelecimento">
          <h2 class="nav-info-estabelecimento__titulo">.milhas</h2>
        </div>

        <div class="pesquisar">
          <v-icon
            size="20"
            class="pesquisar_icone mx-2"
          >mdi mdi-magnify</v-icon>
          <input
            v-model="textoPesquisar"
            class="pesquisar_input"
            type="text"
            placeholder="Pesquisar"
          />
        </div>
      </template>
      <template
        #prepend
        v-else
      >
        <div class="d-flex align-center justify-center mt-4 mb-4">
          <v-avatar
            size="40"
            color="primary"
          >
            <img
              class="logo"
              src="@/assets/logo-branca.svg"
            />
          </v-avatar>
        </div>
      </template>

      <!-- Navigation Items -->
      <v-list
        expand
        shaped
        class="vertical-nav-menu-items pr-5"
      >
        <div
          v-for="item in filteredMenu"
          :key="item.nome"
        >
          <NavMenuSectionTitle
            v-if="item.itens && item.itens.length > 0 && isDrawerOpen == true"
            :title="item.nome"
          ></NavMenuSectionTitle>
          <NavMenuLink
            v-if="!item.itens || item.itens.length == 0"
            :title="item.nome"
            :icon="item.icone"
            :rota="item.rota"
            @clickItemMenu="onClickItemMenu"
          ></NavMenuLink>
          <div
            v-for="subItem in item.itens"
            :key="subItem.nome"
          >
            <NavMenuLink
              :title="subItem.nome"
              :icon="subItem.icone"
              :rota="subItem.rota"
              @clickItemMenu="onClickItemMenu"
            ></NavMenuLink>
          </div>
        </div>
      </v-list>

      <template v-slot:append>
        <div class="pa-4 d-flex flex-column align-center justify-center">
          <span
            v-if="isDrawerOpen"
            class="caption"
          >versão: 1.0.0.1.0.1</span>
        </div>
      </template>
    </v-navigation-drawer>

  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiMagnify } from "@mdi/js";
import NavMenuSectionTitle from "./components/NavMenuSectionTitle.vue";
import NavMenuLink from "./components/NavMenuLink.vue";
import { routes } from "@/router";

export default {
  components: {
    NavMenuSectionTitle,
    NavMenuLink,
  },
  props: {
    isDrawerOpen: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    this.menu = this.createMenu();
  },
  data() {
    return {
      textoPesquisar: "",
      icons: {
        mdiMagnify,
      },
      menu: [],
    };
  },
  computed: {
    nomeFantasia() {
      return this.$store.state?.usuario?.nome_fantasia;
    },
    filteredMenu() {
      const menuFiltered = [];

      if (this.textoPesquisar === "") return this.menu;

      this.menu.forEach((menu) => {
        if (menu.itens) {
          const subItemFiltered = menu.itens.filter((subItem) => {
            return subItem.nome.toLowerCase().includes(this.textoPesquisar.toLowerCase());
          });
          if (subItemFiltered.length > 0) {
            menuFiltered.push({ ...menu, itens: subItemFiltered });
          }
        } else {
          if (menu.nome.toLowerCase().includes(this.textoPesquisar.toLowerCase())) menuFiltered.push(menu);
        }
      });

      return menuFiltered;
    },
  },
  methods: {
    createMenu() {
      const menu = [];
      const grupos = {};

      routes.forEach((route) => {
        if (!route.meta) return;
        if (!route.meta.showLeftMenu) return;

        const grupo = route.meta.grupo;
        const nome = route.meta.titleLeftMenu || route.meta.title;
        const rota = route.name;
        const icone = route.meta.icon;

        if (!grupo) {
          return menu.push({ nome, rota, icone });
        }

        grupos[grupo] = {
          nome: grupo,
          itens: [],
        };

        let findedGroup = menu.find((item) => item.nome === grupo);

        if (!findedGroup) {
          findedGroup = {
            nome: grupo,
            itens: [],
          };
          menu.push(findedGroup);
        }

        findedGroup.itens.push({ nome, rota, icone });
      });

      return menu;
    },
    onClickItemMenu() {
      this.$emit('clickItemMenu');
    }
  },
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'Baloo';
  src: url('~@/assets/fonts/Baloo-Regular.ttf');
}

input {
  border: none;
  background-image: none;
  background-color: transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  all: unset;
}

.app-title {
  font-size: 1.25rem;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.3px;
}

// ? Adjust this `translateX` value to keep logo in center when vertical nav menu is collapsed (Value depends on your logo)
.app-logo {
  transition: all 0.18s ease-in-out;

  .v-navigation-drawer--mini-variant & {
    transform: translateX(-4px);
  }
}

// @include theme(app-navigation-menu) using ($material) {
//   background-color: map-deep-get($material, 'background');
// }

.app-navigation-menu {
  display: flex !important;
  flex-direction: column;
  height: 100%;

  .pesquisar {
    background: #d3d2d5;
    margin: var(--space-sm) var(--space) var(--space-xxs);
    width: calc(100% - (var(--space) * 2));
    padding: var(--space-xxs) var(--space);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    font-size: 0.85rem;
  }

  .nav-info-estabelecimento {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 8px 0 0;
    position: relative;

    &__titulo {
      font-family: "Baloo", cursive;
      padding-top: var(--space-sm);
      color: var(--v-primary-base);
    }
  }

  .logo {
    width: 30px;
    height: 30px;
    border-radius: 0 !important;
  }

  .v-subheader {
    height: 32px;
  }

  .v-list-item {
    flex-grow: 1;

    &.vertical-nav-menu-link {
      ::v-deep .v-list-item__icon {
        .v-icon {
          transition: none !important;
        }
      }
    }
  }

  .vertical-nav-header {
    align-items: center;
    justify-content: center;
  }
}
</style>
