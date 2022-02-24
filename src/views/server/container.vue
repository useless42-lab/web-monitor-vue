<template>
    <div>
        <h3 style="padding-top:20px;padding-bottom:10px;">{{path}}</h3>
        <v-tabs v-model="tab" align-with-title>
            <v-tabs-slider color="primary"></v-tabs-slider>
            <v-tab v-for="item in items" :key="item" :to="item.href">
                {{ item.name }}
            </v-tab>
        </v-tabs>
        <router-view></router-view>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                tab: null,
                items: [{
                        name: '概要',
                        href: 'overview',
                    }
                ],
                path:localStorage.getItem("path")
            }
        },
    }
</script>