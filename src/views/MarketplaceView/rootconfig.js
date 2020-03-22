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
      anchor: "left",
      variant: "permanent",
      width: 244,
      collapsible: false,
      collapsedWidth: 64,
      hidden: true,
      inset: false,
      insetProps: {
        position: "fixed"
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
      variant: "temporary",
      width: 246,
      collapsible: false,
      collapsedWidth: 246,
      hidden: false,
      inset: false,
      insetProps: {
        position: "sticky"
      }
    },
    secondarySidebar: {
      anchor: "left",
      variant: "persistent",
      width: 244,
      collapsible: true,
      collapsedWidth: 64,
      hidden: false,
      inset: false,
      insetProps: {
        position: "sticky"
      }
      // secondarySidebar: {
      //   anchor: "left",
      //   variant: "persistent",
      //   width: 244,

      //   collapsible: false,
      //   collapsedWidth: 64,
      //   hidden: false,
      //   inset: false,
      //   insetProps: {
      //     position: "sticky"
      //   }
      // },
    },
    header: {
      position: "fixed",
      offsetHeight: 64,
      clipped: false,
      secondaryClipped: true,
      persistentBehavior: "fit",
      secondaryPersistentBehavior: "fit"
    },
    content: {
      persistentBehavior: "none",
      secondaryPersistentBehavior: "flexible"
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
      anchor: "left",
      variant: "persistent",
      width: 244,

      collapsible: false,
      collapsedWidth: 64,
      hidden: false,
      inset: false,
      insetProps: {
        position: "sticky",
        left: 0
      }
    },
    header: {
      position: "fixed",
      offsetHeight: 64,
      clipped: true,
      secondaryClipped: true,
      persistentBehavior: "fit",
      secondaryPersistentBehavior: "fit"
    },
    content: {
      persistentBehavior: "fit",
      secondaryPersistentBehavior: "flexible"
    },
    footer: {
      persistentBehavior: "fit",
      secondaryPersistentBehavior: "none",
      insetBehavior: "fit",
      secondaryInsetBehavior: "none"
    }
  }
};
