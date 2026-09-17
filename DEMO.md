# Recording runbook

This local sequence demonstrates all three Runway tool types, the shared manual
controls, screen sharing, and the in-memory ticket flow in about three minutes.

## Before the call

1. Run `pnpm dev` and open [http://localhost:3000](http://localhost:3000).
2. Open `/settings` and click **Test microphone**. This checks browser
   permission without starting a Runway session.
3. Return to `/`, choose light mode, and close any open panel.
4. Click **Start call** and wait for Nova to appear. Starting a call consumes
   Characters credits; the automated checks do not.
5. The camera starts off. Turn it on only if you want to demonstrate
   `<UserVideo />`.
6. To share, use Runway’s standard screen button, choose the Northstar tab, and
   wait for the sharing indicator. The screen and camera previews appear inside
   the agent panel while their tracks are active.

Nova’s quick opening is:

> Hi, I’m Nova. I can explore the dashboard, explain insights, and help with
> tickets. Share your screen if you want help diagnosing what you see.

Use short prompts and wait for the speech or visible action before continuing.
Page Actions and client tools change the browser but do not return a result to
the conversation. Server tools return the demo facts Nova speaks.

## Recording sequence

### 1. Overview insight

Say:

> Give me a quick overview. Include revenue movement, the refund, open tickets,
> and the busiest team.

Expected:

- `get_overview_insights` returns facts calculated from the bundled revenue and
  current in-memory tickets;
- Nova gives a concise spoken brief instead of estimating from the cards.

Manual equivalent: click **Overview insight**.

Then say:

> Put that summary on screen.

Expected:

- Nova gives a short lead-in;
- `open_panel` opens the centered information modal.

Manual equivalent: click **Open an insight panel** or any clickable KPI.

### 2. Page Actions and navigation

Say:

> Show me the Page Actions preview.

Expected:

- Nova briefly explains the action;
- `highlight` pulses the Page Actions card;
- `scroll_to` brings it into view;
- `click` activates the preview.

Manual equivalent: click the **Preview page actions** card.

Now say only:

> Open Revenue.

Expected:

- Nova says she is opening Revenue;
- the navigation target highlights before it is clicked;
- the route changes to `/revenue`.

Manual equivalent: click **Revenue** in the sidebar.

### 3. Revenue range and insight

After the Revenue page is visible, say:

> Show me 30 days.

Expected: `set_date_range` selects the 30-day view.

Manual equivalent: click **30 days**.

Then say:

> For this range, give me the total, change, daily average, peak day, and refund
> insight.

Expected:

- `get_revenue` returns the deterministic 30-day calculation;
- Nova speaks the returned figures and does not infer them from the chart.

Manual equivalent: click **Revenue insight**.

Then say:

> Highlight and open the refund anomaly.

Expected: Nova speaks, highlights the anomaly, and clicks it.

Manual equivalent: click the refund row beneath the chart.

### 4. Ticket workload and filtering

Say only:

> Open Tickets.

Wait for `/tickets`, then say:

> How is the queue split by status and team? Include the busiest team and latest
> ticket.

Expected: `get_ticket_insights` returns the current in-memory queue summary for
Nova to speak.

Manual equivalent: click **Queue insight**.

Then say:

> Show only open tickets.

Expected: `filter_tickets` selects the visible Open view.

Manual equivalent: click **Open**. The **All** and **Billing** controls expose
the other views.

Then say:

> Look up ticket 4803 and tell me its subject, team, and status.

Expected: `get_ticket` returns ticket `4803`, and Nova speaks that exact record.

Manual equivalent: click the row for ticket `4803`.

### 5. Update and refresh a ticket

Say:

> Close ticket 4803.

Expected:

- `update_ticket_status` changes the in-memory record and returns the updated
  ticket;
- Nova confirms the returned ID and status;
- `refresh_tickets` reloads the visible queue.

Manual equivalent: open ticket `4803`, click its status control, then click
**Refresh** if needed.

Restore the starting state:

> Reopen ticket 4803.

Expected: the same server tool returns the open record, followed by the browser
refresh.

The queue is intentionally refreshed after a change; it is not presented as an
automatic external-data update.

### 6. Create and display a ticket

Say:

> Create a Billing ticket called Customer refund timeline is incomplete.

Expected:

- `create_ticket` adds a ticket to server memory and returns the new record;
- Nova speaks the new ticket ID;
- `refresh_tickets` reloads the visible queue so the row appears.

Manual equivalent: click **New ticket**, complete the form, submit it, and use
**Refresh** to reload the queue.

### 7. Finish with another visible action

Say:

> Switch to dark mode.

Expected: Nova speaks first, then highlights and clicks the theme control.

Manual equivalent: click the theme button in the top bar.

## Reliable prompt pattern

Use this rhythm when improvising:

1. Navigate: “Open Revenue.”
2. Wait for the page.
3. Change one visible control: “Show me 90 days.”
4. Ask one data question: “What changed, and where is the peak?”

Avoid combining several page changes and questions into one command. Browser
actions do not report completion back to the conversation, so separate turns
give the next page time to render.

## Resetting the demo

Revenue fixtures are deterministic and do not change. Ticket changes stay in
memory for the life of the Next.js server. Stop and restart `pnpm dev` to restore
the original ticket seed before another recording.

## If Nova cannot hear or respond

- Confirm the microphone button in Runway’s control bar is enabled.
- Confirm the browser granted microphone permission.
- Wait for the current short response before issuing the next prompt.
- If a one-use session disconnects, end it and start a fresh call.
- If a server insight does not produce speech, inspect the local terminal for
  an RPC error.

The app uses Runway’s hosted session and standard SDK controls for microphone,
camera, interruption, and screen sharing. It does not add custom media
orchestration.
