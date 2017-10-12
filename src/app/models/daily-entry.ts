/**
 * TODO: Move models to models folder?
 * Client side model to store a result from a request to the backend
 * /daily_entries endpoint.
 */

export class DailyEntry {
  _id: string;
  worked_all_day: boolean;
  flavor_text: string;
}
