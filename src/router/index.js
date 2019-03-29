import Vue from 'vue'
import Router from 'vue-router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Router)
Vue.use(ElementUI)
import Home from '@/components/Home'
/*----------------------A429-----------------------------------*/
import A429 from '../components/A429/A429'
// 数据监控
import A429Monitor from '../components/A429/A429Monitor'
// 数据回放
import A429PlayBack from '../components/A429/A429PlayBack'
// 数据仿真
import A429Simulate from '../components/A429/A429Simulate'
/*----------------------A664-----------------------------------*/
import A664 from '../components/A664/A664'
// 数据监控
import A664Monitor from '../components/A664/A664Monitor'
//监控配置
import A664Config from '../components/A664/A664Config'
// 数据回放
import A664PlayBack from '../components/A664/A664PlayBack'
// 数据仿真
import A664Simulate from '../components/A664/A664Simulate'
/*------------------------1553B----------------------------------*/
import BUS1553B from '../components/1553B/Bus1553B'
// 数据监控
import BUS1553BMonitor from '../components/1553B/Bus1553BMonitor'
// 数据回放
import BUS1553BPlayBack from '../components/1553B/Bus1553BPlayBack'
// 数据仿真
import BUS1553BSimulate from '../components/1553B/Bus1553BSimulate'
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    }, {
      path: '/a429',
      redirect: {name: 'A429Monitor'},
      component: A429,
      children: [
        {
          path: '/a429monitor',
          name: 'A429Monitor',
          component: A429Monitor,
          meta: {
            keepAlive: true, //此组件需要被缓存
          },
        },
        {
          path: '/a429playback',
          name: 'A429PlayBack',
          component: A429PlayBack,
          meta: {
            keepAlive: true, //此组件需要被缓存
          },
        },
        {
          path: '/a429simulate',
          name: 'A429Simulate',
          component: A429Simulate,
          meta: {
            keepAlive: true, //此组件需要被缓存
          },
        }
      ],
    }, {
      //A664
      path: '/a664',
      redirect: {name: 'A664Monitor'},
      component: A664,
      children: [
        {
          path: '/a664monitor',
          name: 'A664Monitor',
          component: A664Monitor,
          meta: {
            keepAlive: true, //此组件需要被缓存
          },
        },
        {
          path: '/a664playback',
          name: 'A664PlayBack',
          component: A664PlayBack,
          meta: {
            keepAlive: true, //此组件需要被缓存
          },
        },
        {
          path: '/a664simulate',
          name: 'A664Simulate',
          component: A664Simulate,
          meta: {
            keepAlive: true, //此组件需要被缓存
          },
        },
      ],
    }, {
      path: '/a664config',
      name: 'A664Config',
      component: A664Config,
      meta: {
        keepAlive: true, //此组件需要被缓存
      },
    },{
      path: '/bus1553b',
      redirect: {name: 'BUS1553BMonitor'},
      component: BUS1553B,
      children: [
        {
          path: '/bus1553bmonitor',
          name: 'BUS1553BMonitor',
          component: BUS1553BMonitor,
          meta: {
            keepAlive: true, //此组件需要被缓存
          },
        },
        {
          path: '/bus1553bplayback',
          name: 'BUS1553BPlayBack',
          component: BUS1553BPlayBack,
          meta: {
            keepAlive: true, //此组件需要被缓存
          },
        },
        {
          path: '/bus1553bsimulate',
          name: 'BUS1553BSimulate',
          component: BUS1553BSimulate,
          meta: {
            keepAlive: true, //此组件需要被缓存
          },
        }
      ],
    },
  ],
  // 路由跳转回到顶部
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})
