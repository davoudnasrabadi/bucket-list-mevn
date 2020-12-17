<template>
  
 <div id ="app">
   <div v-if="notificationText">
   <div class="notification is-primary">
  <button @click="deleteNotification()" class="delete"></button>
    {{notificationText}}
   </div>
   </div>
   <div class="field has-addons">
     <div class="control is-expanded">
       <input class="input" v-model="description" type="text" placeholder="Add an item"/>
     </div>
     <div class="control">
       <a class="button is-info" v-on:click="addItem">Add</a>
     </div>
   </div>
   <div class="notification" v-for="(item,i) in items" v-bind:key="item._id">
     <div class="columns">
        <p class="column">
       <span class="tag is-primary">{{i+1}} </span>
         {{item.description}}
         <div v-if="editMode && selectedItem._id=== item._id" class="editbox">
           <input class="input"  v-model="editedDescription"/>
           <div class="control">
            <a class="button is-info edit" v-on:click="updateItem(i)">Ok</a>
             <a class="button is-info is-danger" v-on:click="unselect">Cancel</a>
            </div>
          </div>
       </p>
       <div class="columns">
         <div class="column is-narrow">
         <span class="icon has-text-info" @click="removeItem(item,i)">
           Delete
         </span> 
         </div>
         <div class="column is-narrow">
         <span class="icon has-text-info" @click="select(item,i)">
           Edit
         </span> 
         </div>
       </div>
     </div> 
    
   </div>
 </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  components: {
  },
  data(){
    return{
      items:[],
      description:"",
      notificationText:"",
      editedDescription:"",
      selectedItem:null,
      editMode:false
    }
  },
  methods:{
      async addItem(){
         if(this.description === "")
           {
             this.notificationText="Please enter a name";
             return;
           }
           const response = await axios.post('api/bucketListItems',{
             description:this.description
           })
           if(response){
             this.items.push(response.data);
             this.notificationText ="Item Added";
             this.description="";
           }
      },
      deleteNotification(){
        this.notificationText="";
      },
      async removeItem(item,i){
        const response= await axios.delete('api/bucketListItems/'+item._id);
         if(response){
              this.items.splice(i,1);
               this.notificationText ="Item Deleted";
         }
       
      },
      async updateItem(i){
        const response = await axios.put('api/bucketListItems/'+this.selectedItem._id,{
          description:this.editedDescription
        });
        if(response){
          this.items[i] = response.data;
          this.notificationText = 'Item Updated';
        }
        this.unselect();
      },
      select(item,i){
        this.editMode=true;
        this.editedDescription = item.description;
        this.selectedItem=item;
      },
      unselect(){
        this.editMode= false;
        this.editedDescription="";
        this.selectedItem=null;
      }
  },
  async mounted(){
     const response = await axios.get('api/bucketListItems');
     this.items = response.data;
     
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: auto;
  margin-top: 3rem;
  max-width: 700px;
}
.notification{
  margin-bottom: 20px;
}
.has-text-info{
  cursor: pointer;
}
.input{
  margin-bottom: 30px;
}
.editbox{

  margin: 10px
}
.is-danger{
  margin-left: 5px;
}
</style>
