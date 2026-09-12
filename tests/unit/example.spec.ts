import { shallowMount } from "@vue/test-utils";
import About from "@/views/About.vue";
import Home from "@/views/Home.vue";

describe("About.vue", () => {
  it("Renders correctly", () => {
    const wrapper = shallowMount(About);
    expect(wrapper.text()).toMatch("Indonesia Operating System List");
  });
});

describe("Home.vue", () => {
  it('renders heading "Indonesia Operating System List"', () => {
    const wrapper = shallowMount(Home, {
      global: {
        stubs: {
          "o-table": { template: "<div />" },
          "o-table-column": { template: "<div />" },
          "o-notification": { template: "<div />" },
        },
      },
    });
    expect(wrapper.text()).toMatch("Indonesia Operating System List");
  });
});
