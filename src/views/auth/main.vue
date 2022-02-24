<template>
    <div class="auth-container">
        <h1>🍋柠檬监控</h1>
        <router-view></router-view>
    </div>
</template>

<style lang="stylus" scoped>
    .auth-container {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        background: #f0f2f5;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .auth-container {
        background-image: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg');
        background-repeat: no-repeat;
        background-position: center 110px;
        background-size: 100%;
    }
</style>