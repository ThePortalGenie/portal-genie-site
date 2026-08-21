"use client";

import { Home, LayoutPanelTop, Upload } from "lucide-react";
import { getVisiblePortalFolders } from "@/modules/client-portal-simulator/utils/folders";
import { getPortalLogo } from "@/modules/client-portal-simulator/utils/portal-logo";
import { formatCurrency } from "@/modules/client-portal-simulator/utils/format";
import { useDemoPortal } from "@/modules/client-portal-simulator/state/context";
import {
  getDemoWelcomeCustomer,
  resolveWelcomeMessage,
} from "@/modules/client-portal-simulator/utils/welcome-message";
import { getMobileFolderIcon } from "@/modules/client-portal-simulator/components/mobile/folder-icons";
import { MobileNoticeBoardView } from "@/modules/client-portal-simulator/components/mobile/MobileNoticeBoardView";
import { MobilePortalContentRouter } from "@/modules/client-portal-simulator/components/mobile/MobilePortalContent";

function MobilePortalHeader() {
  const { state } = useDemoPortal();
  const logoSrc = getPortalLogo(state);
  const resolvedWelcomeMessage = resolveWelcomeMessage(
    state.welcomeMessage,
    getDemoWelcomeCustomer(),
  );

  return (
    <header
      className="flex shrink-0 items-center gap-2 px-3 py-2.5"
      style={{ backgroundColor: state.mobileDesign.headerBackgroundColour }}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
        <img src={logoSrc} alt="" className="h-7 w-7 object-contain" />
      </div>
      <p className="min-w-0 flex-1 truncate text-[13px] font-semibold text-[#112136]">
        {resolvedWelcomeMessage}
      </p>
      <p className="max-w-[40%] truncate text-right text-[12px] font-medium text-[#112136]/80">
        {state.companyName}
      </p>
    </header>
  );
}

function MobilePortalHome() {
  const { state, dispatch } = useDemoPortal();
  const folders = getVisiblePortalFolders(state.portalFolders);
  const { mobileDesign, mobileBannerUrl, branding } = state;
  const resolvedWelcomeMessage = resolveWelcomeMessage(
    state.welcomeMessage,
    getDemoWelcomeCustomer(),
  );

  const openFolder = (folderId: string) => {
    dispatch({ type: "SET_SECTION", section: folderId });
    dispatch({ type: "SET_MOBILE_PORTAL_VIEW", view: "content" });
  };

  return (
    <>
      <div className="bg-white px-4 py-3">
        <h1 className="text-[18px] font-bold text-[#112136]">{resolvedWelcomeMessage}</h1>
      </div>

      <div className="px-3 pb-2">
        {mobileBannerUrl ? (
          <div className="aspect-[5/2] w-full overflow-hidden rounded-lg border border-[#ececec]">
            <img
              src={mobileBannerUrl}
              alt="Mobile portal banner"
              className="h-full w-full object-cover object-center"
            />
          </div>
        ) : (
          <div
            className="flex aspect-[5/2] w-full items-center justify-center rounded-lg px-4 text-center text-white"
            style={{
              background: `linear-gradient(135deg, ${branding.sidebarBg} 0%, ${branding.brandColor} 100%)`,
            }}
          >
            <p className="text-[13px] font-semibold">{state.companyName}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-x-2 gap-y-4 px-3 pb-4 pt-2">
        {folders.map((folder) => {
          const Icon = getMobileFolderIcon(folder.id);
          return (
            <button
              key={folder.id}
              type="button"
              onClick={() => openFolder(folder.id)}
              className="flex flex-col items-center gap-1.5 text-center"
            >
              <span
                className="flex h-[72px] w-full max-w-[72px] items-center justify-center rounded-[10px] border border-black/5"
                style={{ backgroundColor: mobileDesign.tileBackgroundColour }}
              >
                <Icon
                  className="h-8 w-8"
                  strokeWidth={1.75}
                  style={{ color: mobileDesign.tileIconColour }}
                  aria-hidden="true"
                />
              </span>
              <span
                className="line-clamp-2 text-[10px] font-medium leading-tight"
                style={{ color: mobileDesign.tileLabelColour }}
              >
                {folder.name}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}

function MobilePortalFooter() {
  const { state, dispatch, selectedPaymentTotal, payableInvoices } = useDemoPortal();
  const { mobileDesign, mobilePortalView, selectedInvoiceIds } = state;
  const footerColour = mobileDesign.footerIconLabelColour;
  const isHome = mobilePortalView === "home";
  const isNoticeBoard = mobilePortalView === "notice-board";

  const paymentLabel =
    selectedInvoiceIds.length > 0
      ? formatCurrency(selectedPaymentTotal)
      : "Select invoices";

  const handlePayNow = () => {
    if (selectedPaymentTotal <= 0 && payableInvoices.length > 0) {
      dispatch({
        type: "SELECT_ALL_UNPAID_INVOICES",
        invoiceIds: payableInvoices.map((invoice) => invoice.id),
      });
    }
    if (payableInvoices.length > 0) {
      dispatch({ type: "OPEN_PAYMENT_MODAL" });
    }
  };

  return (
    <footer
      className="grid shrink-0 grid-cols-4 items-end border-t border-black/5 px-1 py-2"
      style={{ backgroundColor: mobileDesign.footerBackgroundColour }}
    >
      <button
        type="button"
        onClick={() => dispatch({ type: "SET_MOBILE_PORTAL_VIEW", view: "home" })}
        className="flex flex-col items-center gap-0.5 px-1 py-1"
      >
        <Home
          className="h-5 w-5"
          style={{ color: footerColour, opacity: isHome ? 1 : 0.75 }}
          aria-hidden="true"
        />
        <span className="text-[9px] font-medium" style={{ color: footerColour }}>
          Home
        </span>
      </button>

      <button
        type="button"
        onClick={() => dispatch({ type: "SET_UPLOAD_MODAL", open: true })}
        className="flex flex-col items-center gap-0.5 px-1 py-1"
      >
        <Upload className="h-5 w-5" style={{ color: footerColour }} aria-hidden="true" />
        <span className="text-[9px] font-medium" style={{ color: footerColour }}>
          Upload
        </span>
      </button>

      <button
        type="button"
        onClick={() => dispatch({ type: "SET_MOBILE_PORTAL_VIEW", view: "notice-board" })}
        className="flex flex-col items-center gap-0.5 px-1 py-1"
      >
        <LayoutPanelTop
          className="h-5 w-5"
          style={{ color: footerColour, opacity: isNoticeBoard ? 1 : 0.75 }}
          aria-hidden="true"
        />
        <span className="text-[9px] font-medium leading-tight" style={{ color: footerColour }}>
          Notice Board
        </span>
      </button>

      <button
        type="button"
        onClick={handlePayNow}
        disabled={payableInvoices.length === 0}
        className="flex flex-col items-center gap-0.5 px-1 py-1 disabled:opacity-50"
      >
        <span
          className="max-w-full truncate px-0.5 text-center text-[9px] font-semibold leading-tight tabular-nums"
          style={{ color: footerColour }}
        >
          {paymentLabel}
        </span>
        <span
          className="rounded px-2 py-0.5 text-[9px] font-bold text-[#112136]"
          style={{ backgroundColor: mobileDesign.addToCartButtonColour }}
        >
          Pay Now
        </span>
      </button>
    </footer>
  );
}

export function MobilePortalShell() {
  const { state } = useDemoPortal();

  return (
    <div
      className="flex h-full w-full min-h-0 flex-col overflow-hidden"
      style={{ backgroundColor: state.mobileDesign.mainBackgroundColour }}
    >
      <MobilePortalHeader />
      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden portal-mobile-screen-scroll">
        {state.mobilePortalView === "home" ? <MobilePortalHome /> : null}
        {state.mobilePortalView === "notice-board" ? <MobileNoticeBoardView /> : null}
        {state.mobilePortalView === "content" ? <MobilePortalContentRouter /> : null}
      </div>
      <MobilePortalFooter />
    </div>
  );
}
