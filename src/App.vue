<template>
  <v-app id="partners">
    <div class="container">
      <div class="partners__header">
        <h1>Партнеры</h1>
        <span>({{ totalPartners }})</span>
      </div>
      <v-data-table
        :headers="headers"
        :items="formattedPartnersForTable"
        :page.sync="page"
        :items-per-page="partnerPerPage"
        hide-default-footer
        class="partners__table"
        @page-count="pageCount = $event"
        no-data-text="Загрузка, пожалуйста подождите"
      >
        <template v-slot:item.status="{ item }">
          <v-chip
            class="partners__status"
            :class="classStatus(item.status)"
          >
            {{ translationStatus(item.status) }}
          </v-chip>
        </template>
        <template v-slot:item.statusAction="{ item }">
          <button
            class="partners__status-action"
            :class="classStatusAction(item.statusAction)"
          >
          </button>
        </template>
      </v-data-table>
      <div class="partners__footer">
        <button
          :class="['partners__show-more', {'partners__show-more--disabled':hasShowMore}]"
          @click="showMore"
          :disabled="hasShowMore"
        >
          Показть ещё
        </button>
        <v-pagination
          v-model="page"
          :length="pageCount"
          class="partners__pagination"
        ></v-pagination>
      </div>
    </div>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      headers: [
        {
          text: 'Дата регистрации', value: 'created', sortable: true, ariaSort: 'ascending', cellClass: 'partners__cell',
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
          text: '', value: 'status', sortable: false, cellClass: 'partners__cell',
        },
        {
          text: '', value: 'statusAction', sortable: false, cellClass: 'partners__cell',
        },
      ],
      page: 1,
      pageCount: 0,
      partnerPerPage: 9,
      partnerPerShowMore: 9,
    };
  },

  computed: {
    ...mapGetters(['getPartners']),

    formattedPartnersForTable() {
      return this.getPartners.map((partner) => ({
        ...partner,
        company: partner.company.name,
        created: this.formattedDate(partner.created),
        statusAction: partner.status,
      }));
    },

    totalPartners() {
      return this.getPartners.length;
    },

    hasShowMore() {
      return this.partnerPerPage > this.totalPartners;
    },
  },

  methods: {
    ...mapActions(['loadPartners']),

    showMore() {
      this.partnerPerPage += this.partnerPerShowMore;
    },

    formattedDate(date) {
      return new Date(date).toLocaleDateString();
    },

    translationStatus(status) {
      switch (status) {
        case 'active':
          return 'активен';
        case 'blocked':
          return 'заблокирован';
        default:
          return '';
      }
    },

    classStatus(status) {
      switch (status) {
        case 'active':
          return 'partners__status--active';
        case 'blocked':
          return 'partners__status--blocked';
        default:
          return '';
      }
    },

    classStatusAction(status) {
      switch (status) {
        case 'active':
          return 'partners__status-action--active';
        case 'blocked':
          return 'partners__status-action--blocked';
        default:
          return '';
      }
    },
  },

  mounted() {
    this.loadPartners();
  },
};
</script>

<style lang="scss" scoped>
@import "styles/main.css";

#partners::v-deep {
  background: #F7F7FC;
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
      font-weight: 400;

    }

    span {
      font-size: 14px;
      line-height: 24px;
      color: #BDBDBD;
      font-weight: 400;
    }
  }

  .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    font-size: 12px;
    line-height: 15px;
    color: #333333;
    border-bottom: none !important;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.06);
    height: 58px !important;

    span {
      font-weight: 400;
    }
  }

  .theme--light.v-data-table .v-data-table-header th.sortable .v-data-table-header__icon {
    opacity: 0.3 !important;
    margin-left: 8px;
    font-size: 0 !important;
    height: 16px;
    width: 16px;
    background-image: url("assets/icon/triangle.svg");
    background-repeat: no-repeat;
    background-position: center;
  }

  .theme--light.v-data-table .v-data-table-header th.sortable.active .v-data-table-header__icon {
    opacity: 1 !important;
  }

  tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background: rgba(243, 243, 255, 1) !important;

    & .partners__status-action {
      opacity: 1;
    }
  }

  .partners__table {
    margin-bottom: 20px;
  }

  .partners__cell {
    font-size: 12px;
    line-height: 140%;
    color: #333333;
    height: 58px !important;
  }

  .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td {
    border-bottom: 1px solid #EEEEEE !important;
  }

  .partners__status {
    padding: 3px 18px;
    min-width: 118px;
    justify-content: center;
    font-size: 12px;
    line-height: 24px;
    border-radius: 20px;
    font-weight: 400;

    &--active {
      color: #99579E;
      background: #F3F3FF;
    }

    &--blocked {
      color: #EB5757;
      background: #FFE2E2;
    }
  }

  .partners__status-action {
    width: 24px;
    height: 24px;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #F3F3FF;
    opacity: 0;

    &--active {
      background-image: url("assets/icon/blockedPartner.svg");
    }

    &--blocked {
      background-image: url("assets/icon/activePartner.svg");
    }
  }

  .partners__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
  }

  .partners__show-more {
    color: #741D7B;
    background: transparent;
    font-size: 12px;
    line-height: 130%;

    &--disabled {
      color: #BDBDBD;
    }
  }

  .partners__pagination {
    .v-pagination__navigation,
    .v-pagination__item {
      min-width: 24px !important;
      height: 24px !important;
      margin: 4px !important;
      background: transparent !important;
      box-shadow: none !important;
    }

    .v-pagination__item {
      color: #828282 !important;
      font-size: 14px;
      line-height: 130%;
      padding: 3px 8px !important;

      &--active {
        color: #741D7B !important;
      }
    }

    .v-pagination__navigation {
      i {
        font-size: 20px !important;
        color: #828282 !important;
      }

      &--disabled {
        opacity: 1 !important;
        i {
          color: #BDBDBD !important;
        }
      }
    }
  }

  .v-progress-linear__indeterminate {
    background-color: #741D7B !important;
    border-color: #741D7B !important;
  }

  .v-progress-linear__background {
    background-color: #741D7B !important;
  }
}
</style>
