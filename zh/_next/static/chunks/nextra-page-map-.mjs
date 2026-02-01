import meta from "../../../pages/_meta.tsx";
import api_reference_meta from "../../../pages/api-reference/_meta.tsx";
import examples_meta from "../../../pages/examples/_meta.tsx";
import get_started_meta from "../../../pages/get-started/_meta.tsx";
export const pageMap = [{
  data: meta
}, {
  name: "api-reference",
  route: "/api-reference",
  children: [{
    data: api_reference_meta
  }, {
    name: "index",
    route: "/api-reference",
    frontMatter: {
      "sidebarTitle": "Index"
    }
  }, {
    name: "methods",
    route: "/api-reference/methods",
    frontMatter: {
      "sidebarTitle": "Methods"
    }
  }, {
    name: "props",
    route: "/api-reference/props",
    frontMatter: {
      "sidebarTitle": "Props"
    }
  }, {
    name: "types",
    route: "/api-reference/types",
    frontMatter: {
      "sidebarTitle": "Types"
    }
  }]
}, {
  name: "examples",
  route: "/examples",
  children: [{
    data: examples_meta
  }, {
    name: "basic-usage",
    route: "/examples/basic-usage",
    frontMatter: {
      "sidebarTitle": "Basic Usage"
    }
  }, {
    name: "cursor",
    route: "/examples/cursor",
    frontMatter: {
      "sidebarTitle": "Cursor"
    }
  }, {
    name: "custom-theme",
    route: "/examples/custom-theme",
    frontMatter: {
      "sidebarTitle": "Custom Theme"
    }
  }, {
    name: "index",
    route: "/examples",
    frontMatter: {
      "sidebarTitle": "Index"
    }
  }, {
    name: "math-formulas",
    route: "/examples/math-formulas",
    frontMatter: {
      "sidebarTitle": "Math Formulas"
    }
  }, {
    name: "mermaid-charts",
    route: "/examples/mermaid-charts",
    frontMatter: {
      "sidebarTitle": "Mermaid Charts"
    }
  }, {
    name: "streaming-data",
    route: "/examples/streaming-data",
    frontMatter: {
      "sidebarTitle": "Streaming Data"
    }
  }, {
    name: "typing-animation",
    route: "/examples/typing-animation",
    frontMatter: {
      "sidebarTitle": "Typing Animation"
    }
  }]
}, {
  name: "get-started",
  route: "/get-started",
  children: [{
    data: get_started_meta
  }, {
    name: "basic-usage",
    route: "/get-started/basic-usage",
    frontMatter: {
      "sidebarTitle": "Basic Usage"
    }
  }, {
    name: "features",
    route: "/get-started/features",
    frontMatter: {
      "sidebarTitle": "Features"
    }
  }, {
    name: "index",
    route: "/get-started",
    frontMatter: {
      "sidebarTitle": "Index"
    }
  }, {
    name: "installation",
    route: "/get-started/installation",
    frontMatter: {
      "sidebarTitle": "Installation"
    }
  }, {
    name: "typing-cursor",
    route: "/get-started/typing-cursor",
    frontMatter: {
      "sidebarTitle": "Typing Cursor"
    }
  }]
}, {
  name: "index",
  route: "/",
  frontMatter: {
    "sidebarTitle": "Index"
  }
}];