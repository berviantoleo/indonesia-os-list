<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Indonesia Operating System List</h1>
      <o-notification
        :has-icon="false"
        variant="info"
        aria-close-label="Close notification"
      >
        Currently the data manually insert into here. The source of data is from
        <a
          class="has-text-white"
          href="https://distrowatch.com/search.php?ostype=All&category=All&origin=Indonesia&basedon=All&notbasedon=None&desktop=All&architecture=All&package=All&rolling=All&isosize=All&netinstall=All&language=All&defaultinit=All&status=All#simple"
          >Distrowatch</a
        >. Feel free to contribute in this website.
      </o-notification>
      <o-table narrowed striped hoverable bordered :data="listData">
        <o-table-column field="id" label="ID" sortable>
          <template #default="{ row }">{{ row.id }}</template>
        </o-table-column>
        <o-table-column field="name" label="Name" sortable>
          <template #default="{ row }">{{ row.name }}</template>
        </o-table-column>
        <o-table-column field="publisher" label="Publisher" sortable>
          <template #default="{ row }">{{ row.publisher }}</template>
        </o-table-column>
        <o-table-column field="publishedSince" label="Published Date" sortable>
          <template #default="{ row }">{{ changeFormat(row.publishedSince) }}</template>
        </o-table-column>
        <o-table-column field="website" label="Website" sortable>
          <template #default="{ row }">
            <a :href="row.website">{{ row.website }}</a>
          </template>
        </o-table-column>
        <o-table-column field="status" label="Status" sortable>
          <template #default="{ row }">
            <div :style="row.status === 'Active' ? 'color:green;' : 'color:red;'">
              {{ row.status }}
            </div>
          </template>
        </o-table-column>
      </o-table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { format, parseISO } from "date-fns";

const listData = [
  {
    id: 1,
    name: "BlankOn",
    publisher: "Indonesian Linux Mover Foundation",
    publishedSince: "2005-02-11",
    website: "https://blankon.id/",
    status: "Dormant",
  },
  {
    id: 2,
    name: "BEE Free",
    publisher: "BEE Free",
    publishedSince: "2018-07-01",
    website: "https://www.beefree.tech",
    status: "Discontinued",
  },
  {
    id: 3,
    name: "Merdeka Trustix Linux",
    publisher: "Merdeka Trustix Linux",
    publishedSince: "2011-01-25",
    website: "http://merdeka.trustix.co.id/",
    status: "Discontinued",
  },
  {
    id: 4,
    name: "WinBi",
    publisher: "WinBi",
    publishedSince: "2002-06-27",
    website: "http://www.software-ri.or.id/winbi/",
    status: "Discontinued",
  },
  {
    id: 5,
    name: "Zencafe",
    publisher: "Zencafe",
    publishedSince: "2007-08-01",
    website: "http://www.zencafe.web.id/",
    status: "Discontinued",
  },
  {
    id: 6,
    name: "TeaLinuxOS",
    publisher: "Dinus Open Source Community (DOSCOM)",
    publishedSince: "2010-10-16",
    website: "https://tealinuxos.org",
    status: "Active",
  },
  {
    id: 7,
    name: "Indonesia, Go Open Source! (IGOS)",
    publisher:
      "Kemenkominfo, Kemenristek, Kemenpan-RB, Kemenkumham, dan Kemendikbud",
    publishedSince: "2004-06-30",
    website: "https://igos-nusantara.or.id",
    status: "Discontinued",
  },
];

function changeFormat(date: string): string {
  return format(parseISO(date), "MMMM do yyyy");
}
</script>
