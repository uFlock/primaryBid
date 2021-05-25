<template style="margin: 0; padding: 0; border: none;">
    <div id="app" style="margin: 0; padding: 0; border: none;">
        <NavBar/>
        <router-view class="router-view"/>
    </div>
</template>

<style src="../src/styles/common.css"/>

<script>
import NavBar from "@/components/NavBar";
export default {
    components: { NavBar }
};
</script>