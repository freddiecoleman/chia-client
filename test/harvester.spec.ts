import * as nock from "nock";
import { Harvester } from "../index";

jest.mock("fs");
jest.mock("yaml");

describe("Harvester", () => {
  describe("RPC calls", () => {
    const harvester = new Harvester({
      hostname: "localhost",
      port: 8560,
      caCertPath: "/dev/null/cert.crt",
      certPath: "/dev/null/cert.crt",
      keyPath: "/dev/null/cert.key",
    });

    it("calls get_plots", async () => {
      nock("https://localhost:8560")
        .defaultReplyHeaders({ "access-control-allow-origin": "*" })
        .post("/get_plots")
        .reply(200, "success");

      expect(await harvester.getPlots()).toEqual("success");
    });

    it("calls refresh_plots", async () => {
      nock("https://localhost:8560")
        .defaultReplyHeaders({ "access-control-allow-origin": "*" })
        .post("/refresh_plots")
        .reply(200, "success");

      expect(await harvester.refreshPlots()).toEqual("success");
    });

    it("calls delete_plot with filename in body", async () => {
      nock("https://localhost:8560")
        .defaultReplyHeaders({ "access-control-allow-origin": "*" })
        .post("/delete_plot", { filename: "fakePlotPath" })
        .reply(200, "success");

      expect(await harvester.deletePlot("fakePlotPath")).toEqual("success");
    });

    it("calls add_plot_directory with dirname in body", async () => {
      nock("https://localhost:8560")
        .defaultReplyHeaders({ "access-control-allow-origin": "*" })
        .post("/add_plot_directory", { dirname: "fakeDirPath" })
        .reply(200, "success");

      expect(await harvester.addPlotDirectory("fakeDirPath")).toEqual("success");
    });

    it("calls get_plot_directories", async () => {
      nock("https://localhost:8560")
        .defaultReplyHeaders({ "access-control-allow-origin": "*" })
        .post("/get_plot_directories")
        .reply(200, "success");

      expect(await harvester.getPlotDirectories()).toEqual("success");
    });

    it("calls remove_plot_directory with dirname in body", async () => {
      nock("https://localhost:8560")
        .defaultReplyHeaders({ "access-control-allow-origin": "*" })
        .post("/remove_plot_directory", { dirname: "fakePlotPath" })
        .reply(200, "success");

      expect(await harvester.removePlotDirectory("fakePlotPath")).toEqual("success");
    });
  });
});