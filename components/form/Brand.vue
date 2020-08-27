<template>
    <div>
        <div class="form-group">
            <label for="">Palette</label>
            <input type="text" class="form-control" v-model="brand.brand_id" placeholder="Brand ID"><br>
            <input type="text" class="form-control" v-model="brand.old_palette_name" placeholder="Old Name"><br>
            <input type="text" class="form-control" v-model="brand.new_palette_name" placeholder="New Name"><br>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    created() {
        if (this.selected) {
            this.brand = {
                brand_id : this.selected.brand_id,
                old_palette_name: this.selected.old_palette_name,
                new_palette_name: this.selected.newpalette_name
            }
        }
    },
    data() {
        return {
            brand: {
                brand_id: '',
                old_palette_name: '',
                new_palette_name: '',
            },
        }
    },
    props: {
        selected: {
            type: Object,
            default: null
        }
    },
    methods: {
        ...mapActions('brands', ['renamePaletteData', 'getPaletteData']),
        submit() {
            this.renamePaletteData(this.brand).then(() => {
                this.clearForm()
            })
        },
        clearForm() {
            this.brand = {
                brand_id: '',
                old_palette_name: '',
                new_palette_name: ''
            }
        }
    }
}
</script>