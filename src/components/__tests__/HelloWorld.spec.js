import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../../App.vue'
import Login from '../Login.vue'


describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(App)
    expect(wrapper.html()).toContain('Main page')
  })
})
//Test Login component fill the inputs and click on login button
describe('Test Login inputs', () => {
  it('Test Login inputs', async () => {
    const wrapper = mount(Login)
    await wrapper.find('input[name="email"]').setValue('test')
    await wrapper.find('input[name="password"]').setValue('12345678')
    await wrapper.find('button[name="submit"]').trigger('click')
    
  })
  
})
