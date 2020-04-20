import { isEscKey } from "@/common/utils";

export const backOnEsc = {
  methods: {
    routerBackOnEsc(keyEvent) {
      if (isEscKey(keyEvent)) {
        this.$router.back();
      }
    }
  }
};
