import { normalizePortalFolders } from "@/lib/demo/client-portal/folders";
import type {
  DemoPortalState,
  NoticeBoard,
  PortalCustomisationSnapshot,
  PortalFolderConfig,
} from "@/lib/demo/client-portal/types";

function cloneNoticeBoards(boards: NoticeBoard[]): NoticeBoard[] {
  return boards.map((board) => ({ ...board }));
}

function clonePortalFolders(folders: PortalFolderConfig[]): PortalFolderConfig[] {
  return normalizePortalFolders(folders.map((folder) => ({ ...folder })));
}

export function captureCustomisationSnapshot(
  state: DemoPortalState,
): PortalCustomisationSnapshot {
  return {
    branding: { ...state.branding },
    companyName: state.companyName,
    welcomeMessage: state.welcomeMessage,
    logoUrl: state.logoUrl,
    alternateLogoUrl: state.alternateLogoUrl,
    useAlternatePortalLogo: state.useAlternatePortalLogo,
    mobileBannerUrl: state.mobileBannerUrl,
    mobileDesign: { ...state.mobileDesign },
    noticeBoards: cloneNoticeBoards(state.noticeBoards),
    activeNoticeBoardId: state.activeNoticeBoardId,
    portalFolders: clonePortalFolders(state.portalFolders),
    notificationEnabled: state.notificationEnabled,
    allowAdditionalContactsPortalAccess: state.allowAdditionalContactsPortalAccess,
    portalPasswordEnabled: state.portalPasswordEnabled,
    portalPassword: state.portalPassword,
    customDomainSubdomain: state.customDomainSubdomain,
    customDomainName: state.customDomainName,
  };
}

export function cloneCustomisationSnapshot(
  snapshot: PortalCustomisationSnapshot,
): PortalCustomisationSnapshot {
  return {
    ...snapshot,
    branding: { ...snapshot.branding },
    mobileDesign: { ...snapshot.mobileDesign },
    noticeBoards: cloneNoticeBoards(snapshot.noticeBoards),
    portalFolders: clonePortalFolders(snapshot.portalFolders),
  };
}

export function customisationSnapshotsEqual(
  left: PortalCustomisationSnapshot,
  right: PortalCustomisationSnapshot,
): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}

export function hasUnsavedCustomisationChanges(state: DemoPortalState): boolean {
  if (!state.savedCustomisation) {
    return true;
  }
  return !customisationSnapshotsEqual(
    captureCustomisationSnapshot(state),
    state.savedCustomisation,
  );
}
