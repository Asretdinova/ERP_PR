<template>
    <div>
       <div class="breadcrumb">
            <slot name="header">
                <b-button variant="secondary ripple m-1" v-if="back" @click="$router.go(-1)">
                    <span class="ul-btn__icon" ><i class="i-Arrow-Back-3"></i></span>
                </b-button>
                <div style="margin: 10px" v-if="back"></div>

               <h1> {{$t('message.'+ page)}}</h1>
                <div style="margin: auto"></div>
                    <ul>
                        <li><a href=""> {{$t('message.'+ folder)}} </a></li>
                        <li> {{$t('message.'+ page)}}</li>
                    </ul>
            </slot>
        </div>
        <div class="separator-breadcrumb border-top"></div>
    </div>
</template>
<script>
export default {
    props:['page','folder', 'back'],

}
</script>
