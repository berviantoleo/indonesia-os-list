import { shallowMount } from "@vue/test-utils";
import About from "@/views/About.vue";

describe("About.vue", () => {
  it("Renders correctly", () => {
    const wrapper = shallowMount(About);
    expect(wrapper.text()).toMatch("Indonesia Operating System List");
  });
});
