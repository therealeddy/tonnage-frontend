import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

import { Loading } from '~/components';
import { money, truck } from '~/images';
import api from '~/services/api';
import { convertFloatInPrice } from '~/utils/convert';

import { Container } from './styles';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState({
    total: '',
    thisMonth: '',
    thisWeek: '',
    thisDay: '',
    priceTotal: '',
    priceThisMonth: '',
    priceThisWeek: '',
    priceThisDay: '',
    evaluationsData: [0, 0, 0, 0, 0],
  });

  useEffect(() => {
    async function getData() {
      setLoading(true);

      const response = await api.get('/management-report');

      const {
        total,
        thisMonth,
        thisWeek,
        thisDay,
        rowsThisTotal,
        rowsThisMonth,
        rowsThisWeek,
        rowsThisDay,
        evaluations,
      } = response.data;

      let priceTotal = 0;
      let priceThisMonth = 0;
      let priceThisWeek = 0;
      let priceThisDay = 0;

      let evaOne = 0;
      let evaTwo = 0;
      let evaThree = 0;
      let evaFour = 0;
      let evaFive = 0;

      evaluations.forEach((item) => {
        if (item.evaluation === 1) {
          evaOne += 1;
        }
        if (item.evaluation === 2) {
          evaTwo += 1;
        }
        if (item.evaluation === 3) {
          evaThree += 1;
        }
        if (item.evaluation === 4) {
          evaFour += 1;
        }
        if (item.evaluation === 5) {
          evaFive += 1;
        }
      });

      rowsThisTotal.forEach((item) => {
        priceTotal += item.transaction.price_total;
      });

      rowsThisMonth.forEach((item) => {
        priceThisMonth += item.transaction.price_total;
      });

      rowsThisWeek.forEach((item) => {
        priceThisWeek += item.transaction.price_total;
      });

      rowsThisDay.forEach((item) => {
        priceThisDay += item.transaction.price_total;
      });

      setReport({
        total,
        thisMonth,
        thisWeek,
        thisDay,
        priceTotal: convertFloatInPrice(priceTotal),
        priceThisMonth: convertFloatInPrice(priceThisMonth),
        priceThisWeek: convertFloatInPrice(priceThisWeek),
        priceThisDay: convertFloatInPrice(priceThisDay),
        evaluationsData: [evaOne, evaTwo, evaThree, evaFour, evaFive],
      });

      setLoading(false);
    }

    getData();
  }, []);

  return (
    <Container className="animated fadeIn">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="container">
            <h2 className="mb-5">Pedidos de coleta</h2>
            <div className="row">
              <div className="col-lg-3">
                <div className="box-report">
                  <div className="top-box">
                    <div className="title-box">Total</div>
                    <img src={truck} alt="truck" />
                  </div>
                  <div className="value-box">{report.total}</div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="box-report">
                  <div className="top-box">
                    <div className="title-box">Este Mês</div>
                    <img src={truck} alt="truck" />
                  </div>
                  <div className="value-box">{report.thisMonth}</div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="box-report">
                  <div className="top-box">
                    <div className="title-box">Esta Semana</div>
                    <img src={truck} alt="truck" />
                  </div>
                  <div className="value-box">{report.thisWeek}</div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="box-report">
                  <div className="top-box">
                    <div className="title-box">Hoje</div>
                    <img src={truck} alt="truck" />
                  </div>
                  <div className="value-box">{report.thisDay}</div>
                </div>
              </div>
            </div>
            <h2 className="mb-5">Lucro</h2>
            <div className="row">
              <div className="col-lg-6">
                <div className="box-report">
                  <div className="top-box">
                    <div className="title-box">Total</div>
                    <img src={money} alt="money" />
                  </div>
                  <div className="value-box">{report.priceTotal}</div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="box-report">
                  <div className="top-box">
                    <div className="title-box">Este Mês</div>
                    <img src={money} alt="money" />
                  </div>
                  <div className="value-box">{report.priceThisMonth}</div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="box-report">
                  <div className="top-box">
                    <div className="title-box">Esta Semana</div>
                    <img src={money} alt="money" />
                  </div>
                  <div className="value-box">{report.priceThisWeek}</div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="box-report">
                  <div className="top-box">
                    <div className="title-box">Hoje</div>
                    <img src={money} alt="money" />
                  </div>
                  <div className="value-box">{report.priceThisDay}</div>
                </div>
              </div>
            </div>

            <h2 className="mb-5">Avaliações</h2>
            <div className="row">
              <div className="col-lg-6">
                <ReactApexChart
                  series={[
                    {
                      name: 'Quantidade',
                      data: report.evaluationsData,
                    },
                  ]}
                  options={{
                    dataLabels: {
                      enabled: false,
                    },
                    xaxis: {
                      type: 'category',
                      categories: [
                        '1 estrela',
                        '2 estrelas',
                        '3 estrelas',
                        '4 estrelas',
                        '5 estrelas',
                      ],
                    },
                    chart: {
                      toolbar: {
                        show: false,
                      },
                    },
                  }}
                  type="bar"
                  height={350}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

export default Dashboard;
