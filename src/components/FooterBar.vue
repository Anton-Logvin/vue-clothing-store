<template>
  <div class="footer">
    <div class="footer__header container">
      <div class="footer__logo">
        <img class="footer__image" src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" alt="">
        <span class="footer__title">Магазин брендовой одежды</span>
      </div>
      <div class="footer__icons">
        <span class="footer__icons-text">Мы в социальных сетях</span>
        <a href="#"><img class="footer__icon" src="../assets/free-icon-instagram-4494488.png" alt=""></a>
        <a href="#"><img class="footer__icon" src="../assets/free-icon-facebook-4494475.png" alt=""></a>
        <a href="#"><img class="footer__icon" src="../assets/free-icon-telegram-4401433.png" alt=""></a>
        <a href="#"><img class="footer__icon" src="../assets/free-icon-youtube-4494485.png" alt=""></a>
        <a href="#"><img class="footer__icon" src="../assets/free-icon-odnoklassniki-3670250.png" alt=""></a>
      </div>
    </div>
    <div class="footer__columns container">
      <!-- <div class="footer__column"> -->
        <ul class="footer__column">
          <li><h6 class="footer__column-title">Компания</h6></li>
          <li><a class="footer__link" href="#">О нас</a></li>
          <li><a class="footer__link" href="#">Адреса магазинов</a></li>
          <li><a class="footer__link" href="#">Новости</a></li>
          <li><a class="footer__link" href="#">Вакансии</a></li>
          <li><a class="footer__link" href="#">Контакты</a></li>
        </ul>
      <!-- </div> -->
      <!-- <div class="footer__column"> -->
        <ul class="footer__column">
          <li><h6 class="footer__column-title">Покупателям</h6></li>
          <li><a class="footer__link" href="#">Как сделать заказ</a></li>
          <li><a class="footer__link" href="#">Доставка</a></li>
          <li><a class="footer__link" href="#">Оплата</a></li>
          <li><a class="footer__link" href="#">Обмен и возврат товара</a></li>
          <li><a class="footer__link" href="#">Обработка персональных данных</a></li>
        </ul>
      <!-- </div>
      <div class="footer__column">  -->
        <ul class="footer__column">
          <li><h6 class="footer__column-title">Акции</h6></li>
          <li><a class="footer__link" href="#">Главные акции</a></li>
          <li><a class="footer__link" href="#">Промокоды</a></li>
          <li><a class="footer__link" href="#">Подарок при покупке</a></li>
          <li><a class="footer__link" href="#">Суперцены</a></li>
          <li><a class="footer__link" href="#">Уцененные товары</a></li>
        </ul>
      <!-- </div>
      <div class="footer__column">   -->
        <ul class="footer__column">
          <li><h6 class="footer__column-title">Компания</h6></li>
          <li><a class="footer__link" href="#">О нас</a></li>
          <li><a class="footer__link" href="#">Адреса магазинов</a></li>
          <li><a class="footer__link" href="#">Новости</a></li>
          <li><a class="footer__link" href="#">Вакансии</a></li>
          <li><a class="footer__link" href="#">Контакты</a></li>
        </ul>
      <!-- </div> -->
    </div>
    <div class="footer__text">
      <span>
        Дата включения сведений об интернет-магазине 5element.by
        в Торговый реестр Республики Беларусь - 11.04.2018
        Номера городских телефонов уполномоченных по защите прав потребителей:
        +37517-368-80-49 – администрация Московского района г. Минска;
        +37517-218-00-82 – главное управление торговли и услуг Мингорисполкома.
      </span>
    </div>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
  .footer {
    background-image: linear-gradient(90deg, #00158f3f,#00c9117e, #073f0067);
    opacity: 0.9;
    background-color: #2aa5a18c;
    padding: 30px;

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__logo {
      
    }

    &__title {
      font-size: 30px;
    }

    &__image {
      width: 100px;
    }

    &__icons {
      
    }

    &__icon {
      max-height: 40px;
      // border-radius: 50%;
      margin: 5px;
    }

    &__icons-text{
      padding-right: 10px;
      color: rgb(255, 238, 0);
      font-size: 17px;
    }

    &__columns {
      display: flex;
      justify-content: space-between;
      padding: 20px 0px;
    }

    &__column {
      text-align: left;
      list-style-type: none
    }

    &__column-title {
      font-size: 17px;
      font-weight: 600;
    }

    &__link {
      text-decoration: none;
      color: #f7f7f7;
    }

    &__link:hover {
      text-decoration: underline;
    }

    &__text {
      margin: 0 auto;
      max-width: 1000px;
      padding: 20px 0px;
    }
  }
</style>