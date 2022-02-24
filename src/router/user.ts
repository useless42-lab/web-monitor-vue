import UserMain from '../views/user/main.vue';

import WebRouter from './web';
import ServerRouter from './server';
import ApiRouter from './api';
import TeamRouter from './team';
import PolicyRouter from './policy';
import GroupRouter from './group';
import SettingRouter from './setting';
import TcpRouter from './tcp';
import DnsRouter from './dns';
import HeartbeatRouter from './heartbeat';
import SteamRouter from './steam';
import MinecraftRouter from './minecraft';
import StatusPageRouter from './status-page';
import SubscribeRouter from './subscribe';

export default [{
    path: "/user",
    component: UserMain,
    children: [
        ...WebRouter,
        ...ServerRouter,
        ...ApiRouter,
        ...TeamRouter,
        ...PolicyRouter,
        ...GroupRouter,
        ...SettingRouter,
        ...TcpRouter,
        ...DnsRouter,
        ...HeartbeatRouter,
        ...SteamRouter,
        ...MinecraftRouter,
        ...StatusPageRouter,
        ...SubscribeRouter,
    ]
}]