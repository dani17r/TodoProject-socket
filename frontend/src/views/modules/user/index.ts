import { defineAsyncComponent } from "vue";

export default {
  ModalSharedWithMe: defineAsyncComponent(() => 
    import("@modules/user/ModalSharedWithMe.vue"
  )),
  MenuOptions: defineAsyncComponent(() => 
    import("@modules/user/MenuOptions.vue"
  )),
  FormProfilePass: defineAsyncComponent(() => 
    import("@modules/user/FormProfilePass.vue"
  )),
  FormProfile: defineAsyncComponent(() => 
    import("@modules/user/FormProfileUser.vue"
  )),
  UploadImgProfile: defineAsyncComponent(() => 
    import("@modules/user/UploadImgProfile.vue"
  )),
  ViewImgProfile: defineAsyncComponent(() => 
    import("@modules/user/ViewImgProfile.vue"
  )),
};
