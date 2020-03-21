export default {
  autoCollapseDisabled: true,
  collapsedBreakpoint: "md",
  secondaryAutoCollapseDisabled: false,
  secondaryCollapseBreakpoint: "md",
  heightAdjustmentDisabled: false,
  insetHiddenBreakpoint: "sm",
  insetHiddenDisabled: false,
  secondaryInsetHiddenBreakpoint: "md",
  secondaryInsetHiddenDisabled: false,
  initialCollapsed: true,
  xs: {
    sidebar: {
      anchor: "left",
      variant: "temporary",
      width: 256,
      collapsible: false,
      collapsedWidth: 64,
      hidden: false,
      inset: false,
      insetProps: {
        position: "fixed",
        top: 0,
        drawerAnchor: "left"
      }
    },
    secondarySidebar: {
      anchor: "right",
      variant: "persistent",
      width: 244,
      collapsible: true,
      collapsedWidth: 64,
      hidden: false,
      inset: false,
      insetProps: {
        position: "sticky",
        top: 0,
        drawerAnchor: "right"
      }
    },
    container: {
      persistentBehavior: "fit",
      secondaryPersistentBehavior: "none"
    },
    content: {
      persistentBehavior: "fit",
      secondaryPersistentBehavior: "none"
    },
    header: {
      position: "fixed",
      offsetHeight: 64,
      clipped: false,
      secondaryClipped: false,
      persistentBehavior: "fit",
      secondaryPersistentBehavior: "fit"
    },
    footer: {
      persistentBehavior: "fit",
      secondaryPersistentBehavior: "none",
      insetBehavior: "fit",
      secondaryInsetBehavior: "none"
    }
  },
  sm: {
    sidebar: {
      anchor: "left",
      variant: "permanent",
      width: 64,
      collapsible: false,
      collapsedWidth: 64,
      hidden: false,
      inset: false,
      insetProps: {
        position: "fixed",
        top: 0,
        drawerAnchor: "left"
      }
    },
    secondarySidebar: {
      anchor: "right",
      variant: "persistent",
      width: 244,
      collapsible: true,
      collapsedWidth: 64,
      hidden: false,
      inset: false,
      insetProps: {
        position: "sticky",
        top: 0,
        drawerAnchor: "right"
      }
    },
    container: {
      persistentBehavior: "fit",
      secondaryPersistentBehavior: "none"
    },
    content: {
      persistentBehavior: "fit",
      secondaryPersistentBehavior: "none"
    },
    header: {
      position: "fixed",
      offsetHeight: 64,
      clipped: false,
      secondaryClipped: false,
      persistentBehavior: "fit",
      secondaryPersistentBehavior: "fit"
    },
    footer: {
      persistentBehavior: "fit",
      secondaryPersistentBehavior: "none",
      insetBehavior: "fit",
      secondaryInsetBehavior: "none"
    }
  },
  md: {
    sidebar: {
      opened: false,
      anchor: "left",
      variant: "permanent",
      width: 256,
      collapsible: true,
      collapsedWidth: 64,
      hidden: false,

      inset: true,
      insetProps: {
        position: "fixed",
        top: 0,
        drawerAnchor: "left"
      }
    },
    secondarySidebar: {
      anchor: "right",
      variant: "persistent",
      width: 244,
      collapsible: true,
      collapsedWidth: 64,
      hidden: false,
      inset: false,
      insetProps: {
        position: "sticky",
        top: 0,
        drawerAnchor: "right"
      }
    },
    container: {
      persistentBehavior: "fit",
      secondaryPersistentBehavior: "none"
    },
    content: {
      persistentBehavior: "fit",
      secondaryPersistentBehavior: "none"
    },
    header: {
      position: "fixed",
      offsetHeight: 64,
      clipped: true,
      secondaryClipped: false,
      persistentBehavior: "fit",
      secondaryPersistentBehavior: "fit"
    },
    footer: {
      persistentBehavior: "fit",
      secondaryPersistentBehavior: "none",
      insetBehavior: "fit",
      secondaryInsetBehavior: "none"
    }
  },
  collapse: false,
  sidebar: {
    anchor: "left",
    width: 64,
    variant: "persistent",
    collapsedWidth: 256,
    collapsible: true
  }
};
