<script setup lang="ts">
import {ref, computed, watch} from 'vue'
// 🎯 Task 1: A ref
const count = ref(0);

// 🎯 Task 2: A ref holding an object  
const user = ref({
  name: 'Alice',
  age: 30
})

const items = ref(['apple', 'banana', 'cherry']);

// 🎯 Task 3: A computed that depends on count
const doubled = computed(()=> count.value*2);
const itemCount = computed(() => items.value.length)

// 🎯 Task 4: A computed that depends on user
const greeting = computed(()=> {
  return `Hello, ${user.value.name}! You are ${user.value.age} years old.`
})

// 🎯 Task 5: A watcher - for console.log
watch(count, (newVal, oldVal) => {
  console.log(`Count changed: ${oldVal} -> ${newVal}`)
})

// Functions called from template
function increment () {
  count.value++
}

function makeOlder() {
  user.value.age++
}
</script>

<template>
  <div class="playground">
    <section>
      <h2>Counter: (ref + computed)</h2>
      <p>Count: {{ count }}</p>
      <p>doubled: {{ doubled }}</p>
      <button @click="increment">increment</button>
    </section>

    <section>
      <h2>User (ref with object)</h2>
      <p>{{ greeting }}</p>
      <input v-model="user.name" placeholder="Change name" />
      <button @click="makeOlder">Birthday</button>
    </section>

    <section>
      <h2>Watch the console!</h2>
      <p>Open DevTool (F12) -> Console tab, then click Increment.</p>
    </section>

    <section>
      <h2>ItemCound</h2>
      <p>{{ itemCount }}</p>

      <ul>
        <li v-for="item in items" :key="item">{{ item }}</li> 
      </ul>
    </section>


  </div>
</template>

<style scoped>
.playground {
  display: flex;
  flex-direction: column;
  gap:1.5rem;
}
section {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}
h2 {
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
  color: #333;
}
button {
  background: #052E45;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
}
input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-right: 0.5rem;
}
</style>