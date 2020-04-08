import Vue from 'vue';

/**
 * 页面跳转-示例
 * <li v-go="'/active/center'"></li>
 */
Vue.directive('go', {
    bind: function (el, binding, vnode) {
        el.addEventListener('click', function () {
            vnode.context.$router.push(binding.value);
        })
    },
    componentUpdated: function (el, binding, vnode) {
        el.addEventListener('click', function () {
            vnode.context.$router.push(binding.value);
        })
    }
});