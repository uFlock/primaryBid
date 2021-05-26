import { shallowMount } from '@vue/test-utils';
import About from '@/views/About.vue';

describe('HelloWorld.vue', () => {
	it('Display Project Name when loading the About Page', () => {
		const msg = 'SHORTY';
		const wrapper = shallowMount(About);
		expect(wrapper.text()).toMatch(msg);
	});
});
