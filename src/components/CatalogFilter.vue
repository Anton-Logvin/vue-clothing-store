<template>
  <!-- 
  TODO: 
    1. сделать компонент custom checkbox
    2. сделать компонент custom input
    3. сделать компонент цена
    4. сделать компонент цвет/группа цветов
    5. оформить фильтр на странице Каталог
    6. Заполнить фильтр данными
    7. Настроить работу фильтра 
  -->
  <div class="filter">
    <p>Категория</p>
    <label>
      <input type="checkbox">
      <span>Майки</span>
    </label>
    <label>
      <input type="checkbox">
      <span>Кепки</span>
    </label>
    <label>
      <input type="checkbox">
      <span>Носки</span>
    </label>
    <p>Цена</p>
    <div>
      <span>От</span>
      <input type="text">
      <span>До</span>
      <input type="text">
    </div>
    <p>Цвета</p>
    <div class="color">
      <label class="color__item">
        <input class="color__checkbox" type="checkbox">
        <span class="color__trigger"></span>
      </label>
      <label class="color__item">
        <input class="color__checkbox" type="checkbox">
        <span class="color__trigger"></span>
      </label>
      <label class="color__item">
        <input class="color__checkbox" type="checkbox">
        <span class="color__trigger"></span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CatalogFilter'
}
</script>

<style lang="scss">
.color {
  &__item {
    cursor: pointer;
    display: block;
  }

  &__trigger {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #ffa500;
    border: 2px solid transparent;
  }

  &__checkbox {
    display: none;
    
    &:checked {
      & + .color__trigger{
        border-color: #cb11ab;
      }
    }
  }
}
</style>