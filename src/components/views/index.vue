<template>
    <div class="index">
        <HeadNav></HeadNav>
        <left></left>
        <router-view></router-view>
    </div>
</template>
<script>
import HeadNav from '../../components/HeadNav.vue'
import  left from '../../components/left.vue'
export default {
    name:'index',
    components: {
       HeadNav,
       left
    }
}
</script>