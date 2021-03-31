<template>
  <div class="select">
    <select @input="onChange">
      <option :value="opt.value" v-for="opt in options" :key="opt.value">
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          label: "Centrado",
          value: "center"
        },
        {
          label: "Norte",
          value: "north"
        },
        {
          label: "Noreste",
          value: "northeast"
        },
        {
          label: "Noroeste",
          value: "northwest"
        },
        {
          label: "Este",
          value: "east"
        },
        {
          label: "Oeste",
          value: "west"
        },
        {
          label: "Sudoeste",
          value: "southwest"
        },
        {
          label: "Sudeste",
          value: "southeast"
        }
      ]
    };
  },
  methods: {
    onChange(e) {
      this.$emit("input", e.target.value);
    }
  }
};
</script>