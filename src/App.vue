<template>
  <v-app>
    <div class="container" id="partners">
      <div class="partners__header">
        <h1>Партнеры</h1>
        <span>({{ partners.length }})</span>
      </div>
      <v-data-table
        :headers="headers"
        :items="partners"
        :items-per-page="5"
        class="partners__table"
      ></v-data-table>
    </div>
  </v-app>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { getPartners } from './api';

export default {
  data() {
    return {
      headers: [
        {
          text: 'Дата регистрации', value: 'created', cellClass: 'partners__cell',
        },
        {
          text: 'Имя', value: 'name', sortable: false, cellClass: 'partners__cell',
        },
        {
          text: 'Название компании', value: 'company', sortable: false, cellClass: 'partners__cell',
        },
        {
          text: 'Телефон', value: 'phone', sortable: false, cellClass: 'partners__cell',
        },
        {
          text: 'E-mail', value: 'email', sortable: false, cellClass: 'partners__cell',
        },
        {
          text: 'Статус', value: 'status', sortable: false, cellClass: 'partners__cell',
        },
        {
          text: '', value: '', sortable: false, cellClass: 'partners__cell',
        },
      ],
      partners: [],
    };
  },

  async mounted() {
    const { data } = await getPartners();
    this.partners = data.map((partner) => (
      { ...partner, company: partner.company.name }));
  },
};
</script>

<style lang="scss" scoped>
@import "styles/main.scss";

#partners::v-deep {
  .partners__header {
    display: flex;
    align-items: center;
    margin: 32px 0 28px;
    h1 {
      font-size: 26px;
      line-height: 24px;
      color: #333333;
      padding-right: 8px;
      width: fit-content;
    }

    span {
      font-size: 14px;
      line-height: 24px;
      color: #BDBDBD;
    }
  }

  .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    font-size: 12px;
    line-height: 15px;
    color: #333333;
  }

  tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background: rgba(243, 243, 255, 1) !important;
  }

  .partners__cell {
    font-size: 12px;
    line-height: 140%;
    color: #333333;
    height: 58px !important;
  }
}
</style>
