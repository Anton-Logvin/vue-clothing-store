<template>
  <div>
    <b-button v-b-toggle.sidebar-no-header class="sidebar-btn">
      Discount 20-50%
    </b-button>
    <b-sidebar id="sidebar-no-header" class="sidebar"  aria-labelledby="sidebar-no-header-title" no-header bg-variant="light" text-variant="dark"  right shadow>
      <template #default="{ hide }">
        <div class="p-3">
          <h4 id="sidebar-no-header-title">Discounted Products</h4>
          <p>STORE DEALS</p>
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item active @click="hide">SALE 50%</b-nav-item>
              <b-nav-item href="#link-1" @click="hide"> SALE 30%</b-nav-item>
              <b-nav-item href="#link-2" @click="hide"> SALE 20%</b-nav-item>
            </b-nav>
          </nav>
          <b-button variant="primary" block @click="hide">Close Sidebar</b-button>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<style scoped>
.sidebar {
  opacity: 0.8;
}

.sidebar-btn {
  color:rgb(0, 151, 0);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.637);
  border: 2px solid rgb(0, 151, 0);;
  box-shadow: 0px 0px 2px rgb(0, 151, 0);;
  padding: 10px 20px;
  transition: all .3s ease-out;
}

.sidebar-btn:hover {
  background: rgba(0, 128, 0, 0.685);
  color: rgb(255, 227, 202);
  box-shadow: 0px 0px 6px rgb(255, 155, 62);;
}
</style>>
