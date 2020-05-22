<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn
        small
        icon
        :color="color"
        v-on="on"
        @click="$emit('click', $event)"
        class="editor-bar-button"
        :class="{'is-active': isActive}"
      >
        <v-icon v-if="!!faClass" small :class="'fa ' + faClass" />
        <span style="font-size: 1rem;" v-else>
          <slot></slot>
        </span>
      </v-btn>
    </template>
    <span>{{ tooltipText }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "EditorMenuButton",
  props: {
    color: {
      type: String,
      required: false,
      default: ""
    },
    faClass: {
      type: String,
      required: false,
    },
    tooltipText: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      required: false,
      default: false,
    }
  }
}
</script>
