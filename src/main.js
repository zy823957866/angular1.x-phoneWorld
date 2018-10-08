import lang from './app/common/lang/index';

import routing from './app/common/config';

//components加载
import components from './app/common/components/components';

//组件加载
import directives from './app/common/directives/directives';

//scss样式
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './app/common/style/common.scss';
import './app/common/style/icon.css';

let app = angular.module('app', ['ui.router', 'oc.lazyLoad', lang, routing, components, directives]);

export default app;