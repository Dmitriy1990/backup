import React, { FC, useState, useEffect } from "react";
import styles from "styles/modules/admin.module.scss";
import clsx from "clsx";
import {
  IconInfo,
  IconDelete,
  IconUser,
  IconArrows,
  IconPlus,
  IconSee,
  IconEdit,
  IconFilter,
} from "assets";
import { routes } from "constantes/routes";
import { AdminHeader } from "components/adminHeader";
import { Switch } from "components/switch";
import { Link } from "react-router-dom";
import Pagination from "components/pagination";
import { ENDPOINTS, client } from "api";
import { Jobs, RootJobs } from "types/jobs";
import * as cron from "cron";
import cronstrue from "cronstrue";
import { ConfirmModal } from "../components/confirmModal";

export const AdminJobs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(50);
  const [jobsList, setJobsList] = useState<Jobs[]>([]);
  const [job, setJob] = useState<Jobs>();
  const [jobModal, setJobModal] = useState(false);

  var dateStr = "2007-03-01T13:00Z/P1Y2M10DT2H30M";
  var date = new Date(Date.parse(dateStr.split("/")[0]));

  console.log("date", date);

  useEffect(() => {
    getJobsList();
  }, []);

  const getJobsList = async () => {
    try {
      const res = await client.get<RootJobs>(ENDPOINTS.SHEDULER.LIST);
      if (res.status === 200) {
        setJobsList(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteJob = async (jobName: string, jobGroup: string) => {
    try {
      setJobModal(false);
      const res = await client.delete(
        `${ENDPOINTS.SHEDULER.DELETE}?jobName=${jobName}&jobGroup=${jobGroup}`
      );

      getJobsList();
    } catch (e) {
      console.log(e);
    }
  };

  const confirmDelete = (job: Jobs) => {
    setJob(job);
    setJobModal(true);
  };

  const onPause = async (job: Jobs) => {
    try {
      const res = await client.put(ENDPOINTS.SHEDULER.PAUSE, {
        jobName: job.jobName,
        jobGroup: job.jobGroup,
      });
      if (res.status == 200) {
        getJobsList();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onResume = async (job: Jobs) => {
    try {
      const res = await client.put(ENDPOINTS.SHEDULER.RESUME, {
        jobName: job.jobName,
        jobGroup: job.jobGroup,
      });
      if (res.status == 200) {
        getJobsList();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="page">
      <AdminHeader />
      <ConfirmModal
        open={jobModal}
        onClose={() => setJobModal(false)}
        job={job}
        onDelete={deleteJob}
      />
      <div></div>
      <div className={styles.wrapper}>
        <div className={styles["table-wrap"]}>
          <div className={styles["table-header"]}>
            <div className={styles["table-header__add"]}>
              <h4 className={styles["table-header__title"]}>Jobs</h4>
              <IconFilter className={styles.icon__btn} />
            </div>
            <Link
              to={routes.adminAddJobs}
              className={styles["table-header__add"]}
            >
              <span className="bold">Add Jobs</span>
              <IconPlus className={styles.icon__btn} />
            </Link>
          </div>

          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr className={styles.tr}>
                <th className={styles.th}>
                  <div className={styles.cell}>Type</div>
                </th>
                <th className={styles.th}>
                  <div className={styles.cell}>Period</div>
                </th>
                <th className={styles.th}>
                  <div className={styles.cell}>Applied to</div>
                </th>
                <th className={styles.th}>
                  <div className={styles.cell}>Status</div>
                </th>
                <th className={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {jobsList.map((job, id) => (
                <tr className={styles.tr} key={id}>
                  <td
                    className={clsx(
                      styles.td,
                      styles.order1,
                      styles.radius__topLeft
                    )}
                  >
                    {job?.triggerList[0]?.triggerState
                      ? job.triggerList[0].triggerState
                      : "-"}
                  </td>
                  <td className={clsx(styles.td, styles.order2)}>
                    {job?.triggerList[0]?.cronExpression
                      ? cronstrue.toString(job.triggerList[0].cronExpression)
                      : "-"}
                  </td>

                  <td className={clsx(styles.td, styles.order5)}>
                    <div className={styles.cell}>
                      {job.accountUserName}
                      {/* <IconInfo className={styles.icon__sort} /> */}
                    </div>
                  </td>
                  <td
                    className={clsx(
                      styles.td,
                      styles.order5,
                      styles.radius__bottomLeft,
                      styles.radius__bottomRight
                    )}
                  >
                    <div className={styles.switch}>
                      <Switch
                        id={job.jobName}
                        checked={job.triggerList[0].triggerState !== "PAUSED"}
                        onChange={() => {
                          if (job.triggerList[0].triggerState !== "PAUSED") {
                            onPause(job);
                          } else {
                            onResume(job);
                          }
                        }}
                      />{" "}
                      <span className={styles.switch__label}>
                        {job.triggerList[0].triggerState !== "PAUSED"
                          ? "Enabled"
                          : "Disabled"}
                      </span>
                    </div>
                  </td>
                  <td
                    className={clsx(
                      styles.td,
                      styles.order4,
                      styles.radius__topRight
                    )}
                  >
                    {/* <IconEdit className={styles.icon__btn} /> */}
                    <IconDelete
                      className={styles.icon__btn}
                      onClick={() => confirmDelete(job)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <Pagination
            currentPage={currentPage}
            totalCount={totalPages}
            pageSize={1}
            onPageChange={(page) => setCurrentPage(page)}
          /> */}
        </div>
      </div>
    </div>
  );
};
