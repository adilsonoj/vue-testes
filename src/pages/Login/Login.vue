<template>
    <v-container>
        <v-card  
            elevation="10"
            class="mx-auto my-12"
            max-width="370"
            >
            <v-card-title>Login</v-card-title>
            <v-card-text>
                <v-row class="text-center">
                    <v-col cols="12">
                        <v-form @submit.prevent="onSubmit">
                            <v-text-field
                                label="Username (email)"
                                :prepend-icon="'mdi-account'"
                                 :rules="[rules.required, rules.email]"
                                 v-model="email"
                                 ref="email"
                                 outlined
                                 placeholder=""
                            
                            ></v-text-field>
                            <v-text-field
                                label="Passowrd"
                                :type="'password'"
                                 :rules="[rules.required]"
                                :prepend-icon="'mdi-lock'"
                                v-model="password"
                                ref="password"
                                outlined
                                placeholder=""
                            ></v-text-field>
                            <div id="recaptcha-container">
                                <vue-recaptcha
                                    ref="recaptcha"
                                    @verify="onCaptchaVerified"
                                    @expired="onCaptchaExpired"
                                    
                                    sitekey="6Ld52d8ZAAAAAFrg_f14KWe2jvQSTTC7DahXxGX-">
                                </vue-recaptcha>
                            </div>
                            <div id="links">
                                <a href="#">Recuperar Senha</a>
                                <a href="#">Cadastrar</a>
                            </div>
                            <v-btn 
                                block
                                outlined
                                color="blue"
                                type="submit">
                                Login
                            </v-btn>
                        </v-form>
                        
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';

export default {
    components:{
        'vue-recaptcha': VueRecaptcha
    },
    data(){
        return{
            rules: {
                required: value => !!value || 'Obrigatório',
                counter: value => value.length <= 20 || 'Max 20 characters',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                },
               
            },
            email: '',
            password: '',
        }
    },
    computed:{
         form () {
            return {
                email: this.email,
                password: this.password,
            }
         }
    },
    methods:{
        recapcha(){

            window.grecaptcha.render("g-recaptcha", {
            "sitekey": "6Ld52d8ZAAAAAFrg_f14KWe2jvQSTTC7DahXxGX-",
            "theme": "light"
          });
        },
        onCaptchaVerified(response){
            console.log("verificado", response)
        },
        onCaptchaExpired(){
            console.log("expirou")
            this.$refs.recaptcha.reset();
        },
        onSubmit(){
            let error = false
            Object.keys(this.form).forEach(f => {
            if(!this.$refs[f].valid){
                error = true
                return
            }
            })
            if(error) return
                console.log('submit')
        }
    }
}
</script>

<style>

</style>
<style scoped>
#links{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 10px 0 10px 0;
}
#recaptcha-container{
     display: flex;
     justify-content: center;
}

a{
    text-decoration:none; 
}

</style>