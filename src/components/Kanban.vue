<template>
<div class="kanban">
      <div class="desks">
      <div v-for="desk in desks" class="desk" :key="desk.id">
          <div v-show="desk.img" class="img"></div>
          <div class="name">{{desk.name}}</div>
      </div>
  </div>
  <div class="table">
        <div class="col" v-for="state in table" :key="state.id">
            <h2 class="subtitle">{{state.name}}</h2>
            <div class="tasks" v-for="tasks[]">

            </div>
        </div>
  </div>
</div>
</template>

<script>
// todo 
/*
desks:[
    {
        name:'',
        id:''
    }
]
tasks:{
    id-desks-link : [ {
        state:'',
        state-desks:'',
        title:'',
        opisanie:'',
        comments:[],
        date:'',
        ...
    }
    ...
    ]
}
table:[ {id: state-desks, name:'ru name'} ...]





*/
export default {
    props: {
        desks: {
            type: Array,
            default:()=>[]
        },
        tasks: {
            type: Object,
            default:()=>{}
        },
        table: {
            type:Array,
            default:()=>[]
        }
    },
    data() {
        return {
            activeDesk:null
        }
    },
    computed: {
        getTasks() {
            return util.groopByToMap(this.tasks[this.activeDesk.id], 'state-desks');
        }
    }

}
</script>

<style>

</style>