<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Rename Palette Name</h4>
                    </div>
                    <div class="card-body">
                        <brand-form ref="form" />
                        <button class="btn btn-primary btn-sm" @click="submit">Save</button>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">
                            List Palette
                        </h4>
                    </div>
                    
                    <!-- call the property from computed -->

                    <div class="card-body row">
                        <div class="col-md-12">
                            <span>Brand ID : {{ brand_id }}</span>
                        </div>
                        <div class="col-md-12" >
                            <span>Palette Color : {{ palette_color }}</span>
                        </div>
                        <div class="col-md-12">
                            <span>User Level : {{ user_level }}</span>
                        </div>
                        <div class="col-md-12">
                            <span>Total Palette : {{ total_palette }}</span>
                        </div>
                        <div class="col-md-12"></div>
                        <div class="col-md-12">
                            <span> Raw Data : {{ palettedata }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapActions, mapState, mapMutations } from 'vuex'
import Brand from '@/components/form/Brand.vue'

export default {

    async asyncData({store}) {
        await Promise.all([
            store.dispatch('brands/getPaletteData')
        ])
        return
    },

    data() {
        return {
            /** you can manage state data from here too */
            arrItems: [],
        }
    },

    /** Mapping palette state and create property for state data */

    computed: {
        ...mapState('brands', {
            palette: state => state.palette,
        }),

        palettedata() {
            return this.palette
        },
        brand_id() {
            return this.palette[0][0]['brandid']
        },
        palette_color() {
            const paletColor = this.palette[0][0]['colorpalette']
            /* for (const [key, value] of Object.entries(paletColor)) {
                this.arrItems.push(([`${key}: ${value}`]))
            } */
            
            return paletColor
        },
        user_level() {
            return this.palette[0][0]['userlevel']
        },
        total_palette() {
            return this.palette[0][0]['totalpalette']
        }
    },
    
    components: {
        'brand-form': Brand
    },

    /** Method for submit button */

    methods: {
        ...mapActions('brands', ['getPaletteData']),
        submit() {
            this.$refs.form.submit()
        },
    }
}
</script>