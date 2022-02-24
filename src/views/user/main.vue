<template>
    <div>
        <v-navigation-drawer v-model="drawer" class="deep-purple accent-4 ios-block" dark app>
            <div
                style="color:white;display:flex;justify-content:center;align-items:center;padding:20px;font-size:1.5em;margin-left:-10px;">
                🍋 柠檬监控</div>
            <v-list nav dense>
                <v-list-item v-for="item in items" :key="item.title" link :to="item.href" @click="getToolbarTitle(item.title)">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
             <v-toolbar-title>{{toolbarTitle}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="logout">
                <v-icon>mdi-logout</v-icon>
            </v-btn>
        </v-app-bar>
        <v-main class="ios-block">
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-main>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                toolbarTitle:'网站',
                drawer: true,
                items: [{
                        title: '网站',
                        icon: 'mdi-web',
                        href: '/user/web/list',
                        value: 1,
                    },
                    {
                        title: '服务器',
                        icon: 'mdi-server',
                        href: '/user/server/list',
                        value: 2,
                    },
                    {
                        title: '接口',
                        icon: 'mdi-api',
                        href: '/user/api/list',
                        value: 3,
                    },
                    {
                        title: 'TCP Port',
                        icon: 'mdi-chart-bubble',
                        href: '/user/tcp/list',
                        value: 4,
                    },
                    {
                        title: 'DNS监控',
                        icon: 'mdi-dns',
                        href: '/user/dns/list',
                        value: 5,
                    },
                    {
                        title: '心跳监控',
                        icon: 'mdi-heart-flash',
                        href: '/user/heartbeat/list',
                        value: 6,
                    },
                    {
                        title: 'Steam Game Server',
                        icon: 'mdi-steam',
                        href: '/user/steam/list',
                        value: 7,
                    },
                    {
                        title: 'Minecraft Server',
                        icon: 'mdi-minecraft',
                        href: '/user/minecraft/list',
                        value: 8,
                    },
                    {
                        title: '状态页',
                        icon: 'mdi-card-search-outline',
                        href: '/user/status-page/list',
                    },
                    {
                        title: "工作空间",
                        icon: "mdi-briefcase",
                        href: '/user/team/list'
                    },
                    {
                        title: "设备分组",
                        icon: "mdi-group",
                        href: '/user/group/list'
                    },
                    {
                        title: "监控策略",
                        icon: "mdi-police-badge-outline",
                        href: '/user/policy/list'
                    },
                    {
                        title: "订阅计划",
                        icon: "mdi-wallet",
                        href: '/user/subscribe/list'
                    },
                    {
                        title: "设置",
                        icon: "mdi-cog",
                        href: '/user/setting/overview'
                    },
                ],
            }
        },
        methods: {
            getToolbarTitle(title){
                this.toolbarTitle=title;
            },
            logout() {
                localStorage.clear();
                this.$router.push("/auth/login");
            }
        }
    }
</script>

<style>
    .ios-block {
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
    }
</style>