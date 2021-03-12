<template>
<div>
	<a class="btn" @click="toggleShow">set avatar</a>
	<my-upload field="img"
		:noCircle="true"
		:noSquare="true"
        @crop-success="cropSuccess"
        v-model="show"
		:width="100"
		:height="100"
        lang-type="pt-br"
		img-format="png"></my-upload>
	<img :src="imgDataUrl" style="border-radius: 50%;">
	<!-- <input type="file" @change="onChange"/> -->
</div>
    
</template>

<script>
	import 'babel-polyfill'; // es6 shim
	import myUpload from 'vue-image-crop-upload';
export default {
	
		data(){
			return  {
			show: true,
			// params: {
			// 	token: '123456798',
			// 	name: 'avatar'
			// },
			// headers: {
			// 	smail: 'abc'
			// },
			imgDataUrl: '', // the datebase64 url of created image
			file: '',
		}
		},
		components: {
			'my-upload': myUpload
		},
	
		methods: {
			onChange(event){
				console.log(event.target.files[0])
			},
			toggleShow() {
				this.show = !this.show;
			},
            /**
			 * crop success
			 *
			 * [param] imgDataUrl
			 * [param] field
			 */
			cropSuccess(imgDataUrl, field){
				console.log('-------- crop success --------');
				console.log('field: ' + field);
				this.imgDataUrl = imgDataUrl;
				this.blobToFile(imgDataUrl);
				console.log(this.file)
			},
			/**
			 * upload success
			 *
			 * [param] jsonData  server api return data, already json encode
			 * [param] field
			 */
			cropUploadSuccess(jsonData, field){
				console.log('-------- upload success --------');
				console.log(jsonData);
				console.log('field: ' + field);
			},
			/**
			 * upload fail
			 *
			 * [param] status    server api return error status, like 500
			 * [param] field
			 */
			cropUploadFail(status, field){
				console.log('-------- upload fail --------');
				console.log(status);
				console.log('field: ' + field);
			},
			dataURItoBlob(dataURI) {
				var byteString = atob(dataURI.split(',')[1]);
				var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
				var ab = new ArrayBuffer(byteString.length);
				var ia = new Uint8Array(ab);

				for (var i = 0; i < byteString.length; i++) {
					ia[i] = byteString.charCodeAt(i);
				}

				var blob = new Blob([ab], {type: mimeString});
				return blob;
			},
			blobToFile(dataURI){
				console.log(dataURI.split(";")[0].split(":")[1])
				const type = dataURI.split(";")[0].split(":")[1];
				const ext = type.split("/")[1]
				const blob = this.dataURItoBlob(dataURI);
				console.log(blob)
				const file = new File([blob], "avatar."+ext, {type:type})
				console.log(file)
				return file;
			}
		}
}
</script>
<style>
.vue-image-crop-upload .vicp-wrap{
	width: 320px
}
</style>