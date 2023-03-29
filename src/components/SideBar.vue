<template>
  <div>
    <b-button v-b-toggle.sidebar-no-header class="sidebar-btn">
      Фильтр
      <b-icon 
        icon="funnel" 
        scale="1.25" 
      ></b-icon>
    </b-button>
    <b-sidebar id="sidebar-no-header" class="sidebar"  aria-labelledby="sidebar-no-header-title" no-header bg-variant="light bg-opacity-75" text-variant="dark"  left shadow>
      <template #default="{ hide }">
        <div class="p-3">
          <catalog-filter class="sidebar__filters"/>
          <b-button variant="primary" block @click="hide">Close Sidebar</b-button>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>

import CatalogFilter from '@/components/CatalogFilter'

export default {
  name: 'SideBar',
  
  components: {
    CatalogFilter
  }
}

</script>

<style scoped>
.sidebar {
  /* opacity: 0.9; */
  /* background: #ca292970; */
  /* position: relative; */
}

.sidebar-btn {
  color:rgb(0, 151, 0);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.637);
  border: 2px solid rgb(0, 151, 0);
  box-shadow: 0px 0px 2px rgb(196, 196, 196);
  padding: 0 16px;
  height: 34px;
  transition: .3s ease;
  display: flex;
  align-items: center;
}

.sidebar-btn:hover {
  background: rgba(0, 128, 0, 0.685);
  color: rgb(255, 255, 255);
  box-shadow: 0px 0px 6px rgb(97, 97, 97);
}

.sidebar__filters {
  /* padding: 20px 0px; */
  display: flex;
  flex-direction: column;
  
  border: 1px solid rgb(230, 230, 230);
  background: #ffffffcc;
  box-shadow: 0px 0px 6px #a3a3a3;
  border-radius: 4px;
}

.btn-close {
  
}
</style>
