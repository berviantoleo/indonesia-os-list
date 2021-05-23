import { Component, Vue } from "vue-property-decorator";
import moment from "moment";

@Component({})
export default class Home extends Vue {
  public data: Record<string, unknown>[] = [
    {
      id: 1,
      name: "BlankOn",
      publisher: "Indonesian Linux Mover Foundation",
      publishedSince: "2005-02-11",
      website: "https://blankonlinux.or.id/",
      status: "Dormant",
    },
    {
      id: 2,
      name: "BEE Free",
      publisher: "BEE Free",
      publishedSince: "2018-07-01",
      website: "https://www.beefree.tech",
      status: "Active",
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
  public changeFormat(date: string): string {
    return moment(date).format("MMMM Do YYYY");
  }
}
