import Vue from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faSearch, fasStar, farStar);

Vue.component("font-awesome-icon", FontAwesomeIcon);
