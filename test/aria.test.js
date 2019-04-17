import VirtualList from '../index'
import { mount } from '@vue/test-utils'
import { getIndexList } from './util'

// for testing base build.
const theme = 'aria-test'

describe(theme, () => {
    const listCount = 1000
    const wrapper = mount({
        template: `
            <div id="app" style="width: 300px;">
                <virtual-list class="list"
                    role="list"
                    :size="40"
                    :remain="6"
                    wclass="group"
                >
                    <div class="for-item"
                        v-for="(item, index) in items"
                        :key="index"
                        style="height: 40px; line-height: 40px;"
                        role="list-item"
                        :aria-setsize="listCount"
                        :aria-posinset="index"
                    >
                        <span class="for-item-text">{{ item }}</span>
                    </div>
                </virtual-list>
            </div>
        `,

        name: 'test',

        components: {
            'virtual-list': VirtualList
        },

        data () {
            return {
                items: getIndexList(listCount),
                listCount
            }
        }
    })

    it('check to see if aria role "list" is set on parent', () => {
        const role = wrapper.find('.list').attributes('role');
        expect(role).toBe('list')
    });
    it('check to see if aria role "group" is set on list container', () => {
        const groupRole = wrapper.find('.list > .group').attributes('role')
        expect(groupRole).toBe('group')
    });
    it('check to see if aria roles and states are set on list items', () => {
        const itemFrags = wrapper.findAll('.for-item')
        const allListItemsTest = itemFrags.wrappers.every((x, i) => {
           return x.attributes('role') === 'list-item'
            && x.attributes('aria-setsize') === listCount.toString() 
            && x.attributes('aria-posinset') === i.toString()
        })
        expect(allListItemsTest).toBe(true)
    });
})