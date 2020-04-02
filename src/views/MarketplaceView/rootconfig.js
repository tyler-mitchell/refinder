export default {
  autoCollapseDisabled: false,
  collapsedBreakpoint: "md",
  secondaryAutoCollapseDisabled: false,
  secondaryCollapseBreakpoint: "md",
  heightAdjustmentDisabled: false,
  insetHiddenBreakpoint: "sm",
  insetHiddenDisabled: false,
  secondaryInsetHiddenBreakpoint: "md",
  secondaryInsetHiddenDisabled: false,
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
        position: "fixed"
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
        position: "sticky"
      }
    },
    header: {
      position: "fixed",
      offsetHeight: 64,
      clipped: false,
      secondaryClipped: false,
      persistentBehavior: "fit",
      secondaryPersistentBehavior: "fit"
    },
    content: {
      persistentBehavior: "fit",
      secondaryPersistentBehavior: "none"
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
        position: "fixed"
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
        position: "sticky"
      }
    },
    header: {
      position: "fixed",
      offsetHeight: 64,
      clipped: false,
      secondaryClipped: true,
      persistentBehavior: "fit",
      secondaryPersistentBehavior: "none"
    },
    content: {
      persistentBehavior: "fit",
      secondaryPersistentBehavior: "none"
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
      anchor: "left",
      variant: "permanent",
      width: 256,
      collapsible: true,
      collapsedWidth: 64,
      hidden: false,
      inset: false,
      insetProps: {
        position: "fixed"
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
        position: "sticky"
      }
    },
    header: {
      position: "fixed",
      offsetHeight: 64,
      clipped: false,
      secondaryClipped: false,
      persistentBehavior: "fit",
      secondaryPersistentBehavior: "none"
    },
    content: {
      persistentBehavior: "fit",
      secondaryPersistentBehavior: "none"
    },
    footer: {
      persistentBehavior: "fit",
      secondaryPersistentBehavior: "none",
      insetBehavior: "fit",
      secondaryInsetBehavior: "none"
    }
  }
};
