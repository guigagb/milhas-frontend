<template>
  <div>
    <v-text-field
      v-model="cmpValue"
      v-bind:label="label"
      v-bind:placeholder="placeholder"
      v-bind:readonly="readonly"
      v-bind:disabled="disabled"
      v-bind:outlined="outlined"
      v-bind:dense="dense"
      v-bind:hide-details="hideDetails"
      v-bind:error="error"
      v-bind:error-messages="errorMessages"
      v-bind:rules="rules"
      v-bind:clearable="clearable"
      v-bind:backgroundColor="backgroundColor"
      v-bind:prefix="options.prefix"
      v-bind:suffix="options.suffix"
      v-bind="properties"
      v-on:keypress="keyPress"
      v-on:keyup="onKeyUp"
      v-on:blur="onBlur"
      v-on:change="onChange"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  model: { prop: "value", event: "input" },
  props: {
    value: {
      // type: String,
      type: [String, Number],
      default: "0",
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    hideDetails: {
      type: [Boolean, String],
      default: false,
    },
    errorMessages: {
      type: [Array, String],
      default: () => [],
    },
    rules: {
      type: [Array, String],
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    backgroundColor: {
      type: String,
    },
    valueWhenIsEmpty: {
      type: String,
      default: "", // "0" or "" or null
    },
    hideZeroValue: {
      type: Boolean,
      default: false,
    },
    startNegative: {
      type: Boolean,
      default: false,
    },
    valueOptions: {
      type: Object,
      default: function () {
        return {
          min: 0,
          minEvent: "SetValueMin",
        };
      },
    },
    options: {
      type: Object,
      default: function () {
        return {
          locale: "pt-BR",
          prefix: "",
          suffix: "",
          length: 11,
          precision: 2,
        };
      },
    },
    // Other v-text-field properties
    properties: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  mounted() {
    this.positive = this.startNegative ? false : true;
  },
  data: () => ({
    positive: true,
  }),
  /*
   v-model="cmpValue": Dessa forma, ao digitar, o valor é atualizado automaticamente no componente pai.
   O valor digitado entra pelo newValue do Set e é emitido para o componente pai.
   the-vue-mask nao funciona corretamente ao incluir valores existentes no componente pai.
  */
  computed: {
    cmpValue: {
      get: function () {
        let value = this.value;

        if (this.hideZeroValue) {
          value = this.value == 0 ? this.valueWhenIsEmpty : this.value;
        }

        return value !== null && value !== "" ? this.humanFormat(value.toString()) : this.valueWhenIsEmpty;
      },
      set: function (newValue) {
        this.$emit("input", this.machineFormat(newValue));
      },
    },
  },
  methods: {
    humanFormat: function (number) {
      if (isNaN(number)) {
        number = "";
      } else {
        number = Number(number).toLocaleString(this.options.locale, {
          maximumFractionDigits: this.options.precision,
          minimumFractionDigits: this.options.precision,
        });
      }
      return number;
    },
    machineFormat(number) {
      if (number) {
        number = this.cleanNumber(number);
        // Ajustar quantidade de zeros à esquerda
        number = number.padStart(parseInt(this.options.precision) + 1, "0");
        // Incluir ponto na casa correta, conforme a precisão configurada
        number =
          number.substring(0, number.length - parseInt(this.options.precision)) +
          "." +
          number.substring(number.length - parseInt(this.options.precision), number.length);
        if (isNaN(number)) {
          number = this.valueWhenIsEmpty;
        }
      } else {
        number = this.valueWhenIsEmpty;
      }
      if (this.options.precision === 0) {
        number = this.cleanNumber(number);
      }
      if (this.positive && number < 0) {
        number = number * -1;
      }
      if (!this.positive && number > 0) {
        number = number * -1;
      }

      return number;
    },
    refreshInput() {
      let value = this.cmpValue.get();
      this.cmpValue.set(value);
    },
    keyPress($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;

      if (!this.positive && keyCode == 43) {
        this.positive = true;
        this.refreshInput();
        $event.preventDefault();
      }

      if (this.positive && keyCode === 45) {
        this.positive = false;
        this.refreshInput();
        $event.preventDefault();
      }
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
      if (this.targetLength()) {
        $event.preventDefault();
      }

      this.$emit("keypress");
    },
    // Retira todos os caracteres não numéricos e zeros à esquerda
    cleanNumber: function (value) {
      let result = "";
      if (value) {
        let flag = false;
        let arrayValue = value.toString().split("");
        for (var i = 0; i < arrayValue.length; i++) {
          if (this.isInteger(arrayValue[i])) {
            if (!flag) {
              // Retirar zeros à esquerda
              if (arrayValue[i] !== "0") {
                result = result + arrayValue[i];
                flag = true;
              }
            } else {
              result = result + arrayValue[i];
            }
          }
        }
      }
      return result;
    },
    isInteger(value) {
      let result = false;
      if (Number.isInteger(parseInt(value))) {
        result = true;
      }
      return result;
    },
    targetLength() {
      if (Number(this.cleanNumber(this.value).length) >= Number(this.options.length)) {
        return true;
      } else {
        return false;
      }
    },
    onBlur() {
      if (this.value.length === 0 || parseFloat(this.value) <= this.valueOptions.min)
        this.$emit(this.valueOptions.minEvent || "SetValueMin", this.valueOptions.min);

      if (this.valueOptions.max && parseFloat(this.value) >= this.valueOptions.max)
        this.$emit(this.valueOptions.maxEvent || "SetValueMax", this.valueOptions.max);

      this.$emit("blur");
    },
    onChange() {
      this.$emit("change");
    },
    onKeyUp() {
      this.$emit("keyup");
    },
  },
};
</script>
