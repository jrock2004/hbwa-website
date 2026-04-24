(function () {
  // Brand blue matching --brand: 210 29% 32%
  var BRAND = "#2a6fa1";

  function toJS(val) {
    return val && typeof val.toJS === "function" ? val.toJS() : val;
  }

  // ─── Shared UI helpers ──────────────────────────────────────────────────────

  function PageWrap(children) {
    return h(
      "div",
      {
        style: {
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#1a2236",
          padding: "24px",
          maxWidth: "900px",
          margin: "0 auto",
          lineHeight: "1.5",
        },
      },
      children,
    );
  }

  function Card(title, children) {
    return h(
      "div",
      {
        style: {
          background: "#fff",
          border: "1px solid #dce3ed",
          borderRadius: "12px",
          padding: "18px",
          marginBottom: "16px",
        },
      },
      title &&
        h(
          "h3",
          {
            style: {
              margin: "0 0 12px",
              paddingBottom: "10px",
              borderBottom: "1px solid #dce3ed",
              fontSize: "0.9375rem",
              fontWeight: "600",
            },
          },
          title,
        ),
      children,
    );
  }

  function SectionHeading(text) {
    return h("h2", { style: { fontSize: "1.25rem", fontWeight: "700", margin: "0 0 14px" } }, text);
  }

  function Muted(text) {
    return h("span", { style: { color: "#64748b", fontSize: "0.8125rem" } }, text);
  }

  // ─── Site Settings ──────────────────────────────────────────────────────────

  function SitePreview(props) {
    var data = toJS(props.entry.getIn(["data"])) || {};
    var hero = data.hero || {};
    var ctas = hero.ctas || [];
    var imgSrc = null;
    if (hero.image && hero.image.src) {
      var asset = props.getAsset(hero.image.src);
      if (asset) imgSrc = asset.toString();
    }
    var contact = data.contact || {};
    var addr = contact.address || {};
    var notices = data.notices || [];
    var quickLinks = data.quickLinks || [];
    var about = data.about || {};

    return PageWrap([
      // Hero
      h(
        "section",
        {
          style: {
            background: "#eef1f5",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            alignItems: "center",
          },
        },
        h(
          "div",
          null,
          h(
            "h1",
            { style: { fontSize: "1.25rem", fontWeight: "600", margin: "0 0 8px" } },
            hero.title || "Hero Title",
          ),
          h(
            "p",
            { style: { color: "#4b5a6a", fontSize: "0.875rem", margin: "0 0 16px" } },
            hero.tagline || "",
          ),
          h(
            "div",
            { style: { display: "flex", flexWrap: "wrap", gap: "8px" } },
            ctas.map(function (cta, i) {
              var isPrimary = cta.variant === "primary";
              var isOutline = cta.variant === "outline";
              return h(
                "span",
                {
                  key: i,
                  style: {
                    display: "inline-block",
                    padding: "6px 16px",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    background: isPrimary ? BRAND : "transparent",
                    color: isPrimary ? "#fff" : BRAND,
                    border: isOutline ? "1.5px solid " + BRAND : "none",
                    cursor: "default",
                  },
                },
                cta.label,
              );
            }),
          ),
        ),
        imgSrc
          ? h("img", {
              src: imgSrc,
              alt: (hero.image && hero.image.alt) || "",
              style: {
                width: "100%",
                aspectRatio: "16/9",
                objectFit: "cover",
                borderRadius: "8px",
              },
            })
          : h(
              "div",
              {
                style: {
                  width: "100%",
                  aspectRatio: "16/9",
                  background: "#cdd5e0",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#64748b",
                  fontSize: "0.875rem",
                },
              },
              "No image selected",
            ),
      ),

      // About blurbs
      (about.left || about.right) &&
        h(
          "section",
          { style: { marginBottom: "24px" } },
          SectionHeading("About Blurbs"),
          h(
            "div",
            {
              style: {
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                fontSize: "0.875rem",
                color: "#374151",
              },
            },
            h(
              "ul",
              { style: { margin: 0, paddingLeft: "18px" } },
              (about.left || []).map(function (item, i) {
                return h("li", { key: i, style: { marginBottom: "4px" } }, item.item || item);
              }),
            ),
            h(
              "ul",
              { style: { margin: 0, paddingLeft: "18px" } },
              (about.right || []).map(function (item, i) {
                return h("li", { key: i, style: { marginBottom: "4px" } }, item.item || item);
              }),
            ),
          ),
        ),

      // CCR Banner
      data.ccr &&
        h(
          "section",
          {
            style: {
              background: BRAND,
              color: "#fff",
              borderRadius: "12px",
              padding: "20px 24px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            },
          },
          h(
            "span",
            { style: { fontWeight: "600", fontSize: "1rem" } },
            data.ccr.title || "CCR Banner",
          ),
          h(
            "div",
            { style: { display: "flex", gap: "8px" } },
            data.ccr.primary &&
              h(
                "span",
                {
                  style: {
                    padding: "6px 14px",
                    background: "#fff",
                    color: BRAND,
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                  },
                },
                data.ccr.primary.label,
              ),
            data.ccr.secondary &&
              h(
                "span",
                {
                  style: {
                    padding: "6px 14px",
                    border: "1.5px solid rgba(255,255,255,0.7)",
                    color: "#fff",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                  },
                },
                data.ccr.secondary.label,
              ),
          ),
        ),

      // Contact + Quick Links row
      h(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginBottom: "24px",
          },
        },
        Card(
          "Contact",
          h(
            "div",
            { style: { fontSize: "0.875rem", lineHeight: "1.9" } },
            contact.phone && h("div", null, "📞 " + contact.phone),
            contact.email && h("div", null, "✉️ " + contact.email),
            addr.street &&
              h(
                "div",
                null,
                "📍 " +
                  [
                    addr.buildingName,
                    addr.street,
                    addr.city && addr.state
                      ? addr.city + ", " + addr.state + " " + (addr.zip || "")
                      : null,
                    addr.poBox ? "P.O. Box " + addr.poBox : null,
                  ]
                    .filter(Boolean)
                    .join(", "),
              ),
          ),
        ),
        Card(
          "Quick Links",
          h(
            "ul",
            { style: { margin: 0, padding: 0, listStyle: "none" } },
            quickLinks.map(function (link, i) {
              return h(
                "li",
                { key: i, style: { padding: "4px 0", fontSize: "0.875rem" } },
                h("a", { href: link.to, style: { color: BRAND } }, link.label),
              );
            }),
          ),
        ),
      ),

      // Notices
      notices.length > 0 &&
        h(
          "section",
          null,
          SectionHeading("News & Notices"),
          h(
            "ul",
            { style: { margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "8px" } },
            notices.map(function (n, i) {
              return h(
                "li",
                {
                  key: i,
                  style: {
                    background: "#f8fafc",
                    border: "1px solid #dce3ed",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "0.875rem",
                  },
                },
                h("strong", null, n.title || "Untitled"),
                Muted(n.date || ""),
              );
            }),
          ),
        ),
    ]);
  }

  CMS.registerPreviewTemplate("site", SitePreview);

  // ─── Alerts ─────────────────────────────────────────────────────────────────

  function AlertsPreview(props) {
    var data = toJS(props.entry.getIn(["data"])) || {};
    var items = data.items || [];

    return PageWrap([
      h(
        "h1",
        { style: { fontSize: "1.875rem", fontWeight: "700", marginBottom: "20px" } },
        "Alerts",
      ),
      items.length === 0
        ? h("p", { style: { color: "#64748b" } }, "No alerts defined.")
        : items.map(function (a, i) {
            var isEmerg = a.severity === "emergency";
            var bg = isEmerg ? "#fef2f2" : "#fffbeb";
            var borderColor = isEmerg ? "rgba(220,38,38,0.3)" : "rgba(202,138,4,0.3)";
            var icon = isEmerg ? "⚠️" : "ℹ️";

            var dateStr = "";
            try {
              if (a.effectiveFrom) {
                var fmt = { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" };
                var start = new Date(a.effectiveFrom).toLocaleString(undefined, fmt);
                dateStr = a.effectiveTo
                  ? start +
                    " → " +
                    new Date(a.effectiveTo).toLocaleString(undefined, {
                      month: "short",
                      day: "numeric",
                    })
                  : start + " → ongoing";
              }
            } catch (e) {}

            return h(
              "article",
              {
                key: i,
                style: {
                  background: bg,
                  border: "1px solid " + borderColor,
                  borderRadius: "14px",
                  padding: "16px",
                  marginBottom: "12px",
                },
              },
              h(
                "header",
                { style: { display: "flex", gap: "10px", alignItems: "flex-start" } },
                h("span", { style: { fontSize: "1.1rem", flexShrink: 0 } }, icon),
                h(
                  "div",
                  null,
                  h(
                    "h3",
                    { style: { margin: "0 0 2px", fontSize: "1rem", fontWeight: "600" } },
                    a.title || "Untitled",
                  ),
                  dateStr &&
                    h(
                      "p",
                      { style: { margin: 0, fontSize: "0.75rem", color: "#64748b" } },
                      dateStr,
                    ),
                ),
              ),
              a.description &&
                h(
                  "p",
                  { style: { margin: "10px 0 0", fontSize: "0.875rem", lineHeight: "1.6" } },
                  a.description,
                ),
              a.link &&
                h(
                  "a",
                  {
                    href: a.link,
                    style: {
                      display: "inline-block",
                      marginTop: "10px",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: BRAND,
                      textDecoration: "underline",
                    },
                  },
                  "View full notice",
                ),
              a.tags &&
                a.tags.length > 0 &&
                h(
                  "div",
                  { style: { marginTop: "10px", display: "flex", gap: "6px", flexWrap: "wrap" } },
                  a.tags.map(function (t, j) {
                    return h(
                      "span",
                      {
                        key: j,
                        style: {
                          fontSize: "0.75rem",
                          padding: "2px 9px",
                          border: "1px solid #d1d5db",
                          borderRadius: "999px",
                          color: "#64748b",
                        },
                      },
                      t,
                    );
                  }),
                ),
            );
          }),
    ]);
  }

  CMS.registerPreviewTemplate("alerts", AlertsPreview);

  // ─── Documents ──────────────────────────────────────────────────────────────

  function DocumentsPreview(props) {
    var data = toJS(props.entry.getIn(["data"])) || {};
    var items = (data.items || []).slice().sort(function (a, b) {
      return (b.date || "").localeCompare(a.date || "");
    });

    return PageWrap([
      h(
        "h1",
        { style: { fontSize: "1.875rem", fontWeight: "700", marginBottom: "20px" } },
        "Documents",
      ),
      items.length === 0
        ? h("p", { style: { color: "#64748b" } }, "No documents defined.")
        : h(
            "ul",
            { style: { margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "10px" } },
            items.map(function (d, i) {
              var dateStr = "";
              try {
                if (d.date) dateStr = new Date(d.date + "T00:00:00").toLocaleDateString();
              } catch (e) {}

              return h(
                "li",
                {
                  key: i,
                  style: {
                    background: "#fff",
                    border: "1px solid #dce3ed",
                    borderRadius: "10px",
                    padding: "14px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  },
                },
                h(
                  "div",
                  null,
                  h(
                    "a",
                    {
                      href: d.url || "#",
                      target: "_blank",
                      style: {
                        fontWeight: "500",
                        color: BRAND,
                        textDecoration: "none",
                        fontSize: "0.9375rem",
                      },
                    },
                    d.title || "Untitled",
                  ),
                  h(
                    "div",
                    { style: { fontSize: "0.75rem", color: "#64748b", marginTop: "3px" } },
                    [d.category, dateStr].filter(Boolean).join(" • "),
                  ),
                ),
                h(
                  "span",
                  {
                    style: {
                      fontSize: "0.8125rem",
                      color: BRAND,
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    },
                  },
                  "View PDF",
                ),
              );
            }),
          ),
    ]);
  }

  CMS.registerPreviewTemplate("documents", DocumentsPreview);

  // ─── Governance ─────────────────────────────────────────────────────────────

  function GovernancePreview(props) {
    var data = toJS(props.entry.getIn(["data"])) || {};

    function DirectoryCard(title, items, isMemberships) {
      return Card(
        title,
        (items || []).length === 0
          ? h("p", { style: { color: "#9ca3af", fontSize: "0.875rem", margin: 0 } }, "None")
          : h(
              "ul",
              { style: { margin: 0, padding: 0, listStyle: "none" } },
              (items || []).map(function (item, i) {
                return h(
                  "li",
                  {
                    key: i,
                    style: {
                      padding: "7px 0",
                      borderBottom: i < items.length - 1 ? "1px solid #f1f5f9" : "none",
                      fontSize: "0.875rem",
                    },
                  },
                  isMemberships
                    ? h("span", null, item)
                    : h(
                        "div",
                        null,
                        h(
                          "span",
                          { style: { display: "block", fontSize: "0.75rem", color: "#64748b" } },
                          item.role || "",
                        ),
                        h("span", { style: { fontWeight: "500" } }, item.name || ""),
                      ),
                );
              }),
            ),
      );
    }

    return PageWrap([
      h(
        "header",
        { style: { textAlign: "center", marginBottom: "28px" } },
        h(
          "h1",
          { style: { fontSize: "1.875rem", fontWeight: "700", margin: "0 0 6px" } },
          "Governance",
        ),
        h(
          "p",
          { style: { color: "#64748b", margin: 0 } },
          "Board Members, Employees, Consultants, and Professional Memberships",
        ),
      ),
      h(
        "div",
        { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" } },
        DirectoryCard("Board Members", data.board, false),
        DirectoryCard("Employees", data.employees, false),
        DirectoryCard("Professional Memberships", data.memberships, true),
        DirectoryCard("Consultants", data.consultants, false),
      ),
    ]);
  }

  CMS.registerPreviewTemplate("governance", GovernancePreview);

  // ─── Helpful Links ──────────────────────────────────────────────────────────

  function LinksPreview(props) {
    var data = toJS(props.entry.getIn(["data"])) || {};
    var groups = data.groups || [];

    return PageWrap([
      h(
        "header",
        { style: { marginBottom: "22px" } },
        h(
          "h1",
          { style: { fontSize: "1.5rem", fontWeight: "700", margin: "0 0 4px" } },
          data.title || "Helpful Links",
        ),
        h(
          "p",
          { style: { color: "#64748b", fontSize: "0.875rem", margin: 0 } },
          "All links open in a new tab.",
        ),
      ),
      h(
        "div",
        { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" } },
        groups.map(function (group, i) {
          return Card(
            group.label,
            h(
              "ul",
              { key: i, style: { margin: 0, padding: 0, listStyle: "none" } },
              (group.items || []).map(function (item, j) {
                return h(
                  "li",
                  { key: j, style: { padding: "5px 0", fontSize: "0.875rem" } },
                  h(
                    "a",
                    {
                      href: item.url || "#",
                      target: "_blank",
                      style: { color: BRAND, textDecoration: "none" },
                    },
                    item.name || "",
                  ),
                );
              }),
            ),
          );
        }),
      ),
    ]);
  }

  CMS.registerPreviewTemplate("links", LinksPreview);

  // ─── Gallery / Pictures ─────────────────────────────────────────────────────

  function GalleryPreview(props) {
    var data = toJS(props.entry.getIn(["data"])) || {};
    var items = data.items || [];

    return PageWrap([
      h(
        "h1",
        { style: { fontSize: "1.5rem", fontWeight: "600", marginBottom: "16px" } },
        "Gallery",
      ),
      items.length === 0
        ? h("p", { style: { color: "#64748b" } }, "No images defined.")
        : h(
            "div",
            {
              style: {
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px",
              },
            },
            items.map(function (item, i) {
              var asset = item.src ? props.getAsset(item.src) : null;
              var src = asset ? asset.toString() : null;
              return h(
                "div",
                {
                  key: i,
                  style: {
                    borderRadius: "10px",
                    overflow: "hidden",
                    position: "relative",
                    aspectRatio: "16/9",
                    background: "#e2e8f0",
                  },
                },
                src
                  ? h("img", {
                      src: src,
                      alt: item.alt || "",
                      style: { width: "100%", height: "100%", objectFit: "cover" },
                    })
                  : h(
                      "div",
                      {
                        style: {
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#94a3b8",
                          fontSize: "0.75rem",
                        },
                      },
                      "No image",
                    ),
                (item.title || item.caption) &&
                  h(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: "rgba(0,0,0,0.5)",
                        color: "#fff",
                        padding: "6px 9px",
                        fontSize: "0.75rem",
                      },
                    },
                    item.title &&
                      h("div", { style: { fontWeight: "600", marginBottom: "1px" } }, item.title),
                    item.caption && h("div", null, item.caption),
                  ),
              );
            }),
          ),
    ]);
  }

  CMS.registerPreviewTemplate("pictures", GalleryPreview);

  // ─── Rates ──────────────────────────────────────────────────────────────────

  function RatesPreview(props) {
    var data = toJS(props.entry.getIn(["data"])) || {};
    var sections = data.sections || [];
    var notes = data.notes || [];

    function fmtAmount(fee) {
      if (fee.amountUSD != null && fee.amountUSD !== "")
        return "$" + Number(fee.amountUSD).toFixed(2);
      if (fee.amountText) return fee.amountText;
      return "—";
    }

    function FeeTable(fees) {
      if (!fees || fees.length === 0) return null;
      return h(
        "table",
        { style: { width: "100%", borderCollapse: "collapse", marginBottom: "4px" } },
        h(
          "tbody",
          null,
          fees.map(function (fee, j) {
            return h(
              "tr",
              { key: j, style: { borderBottom: "1px solid #f1f5f9" } },
              h("td", { style: { padding: "6px 8px", fontSize: "0.875rem" } }, fee.label || ""),
              h(
                "td",
                {
                  style: {
                    padding: "6px 8px",
                    fontSize: "0.875rem",
                    textAlign: "right",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    color: BRAND,
                  },
                },
                fmtAmount(fee),
              ),
              h(
                "td",
                { style: { padding: "6px 8px", fontSize: "0.75rem", color: "#64748b" } },
                fee.details || "",
              ),
            );
          }),
        ),
      );
    }

    var effectiveDateStr = "";
    try {
      if (data.effectiveDate)
        effectiveDateStr = new Date(data.effectiveDate + "T00:00:00").toLocaleDateString(
          undefined,
          { year: "numeric", month: "long", day: "numeric" },
        );
    } catch (e) {}

    return PageWrap([
      h(
        "header",
        { style: { marginBottom: "22px" } },
        h(
          "h1",
          { style: { fontSize: "1.875rem", fontWeight: "700", margin: "0 0 4px" } },
          data.title || "Rate Schedule",
        ),
        effectiveDateStr &&
          h(
            "p",
            { style: { color: "#64748b", fontSize: "0.875rem", margin: 0 } },
            "Effective: " + effectiveDateStr,
          ),
      ),
      sections.map(function (sec, i) {
        return h(
          "div",
          {
            key: i,
            style: {
              background: "#fff",
              border: "1px solid #dce3ed",
              borderRadius: "12px",
              padding: "18px",
              marginBottom: "14px",
            },
          },
          h(
            "h2",
            {
              style: {
                fontSize: "1rem",
                fontWeight: "600",
                color: BRAND,
                margin: "0 0 12px",
                paddingBottom: "8px",
                borderBottom: "1px solid #dce3ed",
              },
            },
            sec.title || "",
          ),
          FeeTable(sec.fees),
          (sec.subsections || []).map(function (sub, j) {
            return h(
              "div",
              { key: j, style: { marginTop: "14px" } },
              h(
                "h3",
                {
                  style: {
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    margin: "0 0 6px",
                    color: "#374151",
                  },
                },
                sub.title || "",
                sub.subtitle &&
                  h(
                    "span",
                    { style: { fontWeight: "400", color: "#64748b" } },
                    " — " + sub.subtitle,
                  ),
              ),
              FeeTable(sub.fees),
            );
          }),
          (sec.policies || []).length > 0 &&
            h(
              "ul",
              {
                style: {
                  marginTop: "12px",
                  paddingLeft: "18px",
                  fontSize: "0.875rem",
                  color: "#374151",
                },
              },
              (sec.policies || []).map(function (policy, j) {
                return h("li", { key: j, style: { marginBottom: "4px" } }, policy.policy || policy);
              }),
            ),
        );
      }),
      notes.length > 0 &&
        h(
          "div",
          {
            style: {
              marginTop: "16px",
              borderTop: "1px solid #dce3ed",
              paddingTop: "14px",
            },
          },
          h(
            "h3",
            { style: { fontSize: "0.875rem", fontWeight: "600", margin: "0 0 8px" } },
            "Notes",
          ),
          notes.map(function (note, i) {
            return h(
              "p",
              { key: i, style: { fontSize: "0.8125rem", color: "#64748b", margin: "0 0 4px" } },
              h("strong", null, "[" + (note.key || "") + "] "),
              note.value || "",
            );
          }),
        ),
    ]);
  }

  CMS.registerPreviewTemplate("rates", RatesPreview);
})();
