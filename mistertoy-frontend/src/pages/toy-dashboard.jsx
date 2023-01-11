import { InstockChart } from "../cmps/instock-chart";
import { PriceChart } from "../cmps/price-chart";
import { useEffect } from 'react'
import { loadToys } from '../store/toy.action'
import { useSelector } from 'react-redux'

export function ToyDashboard() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)
  
    useEffect(() => {
      loadToys()
    }, [])

        function getChartsData() {
        const chartsData = toys.reduce(
          (acc, toy) => {
            toy.labels.forEach((label) => {
              acc.labelsCountMap[label] = acc.labelsCountMap[label] ? ++acc.labelsCountMap[label] : 1
              acc.labelsPriceMap[label] = acc.labelsPriceMap[label] ? (acc.labelsPriceMap[label] += toy.price) : toy.price
            })
    
            return acc
          },
          { labelsCountMap: {}, labelsPriceMap: {} }
        )
        Object.keys(chartsData.labelsPriceMap).forEach((label) => (chartsData.labelsPriceMap[label] /= chartsData.labelsCountMap[label]))
    
        return chartsData
      }

    const { labelsPriceMap, labelsCountMap } = getChartsData()

    return <section className="dashboard">
        <InstockChart dataMap={labelsCountMap}/>
        {/* <InstockChart /> */}
        {/* <PriceChart /> */}
        <PriceChart dataMap={labelsPriceMap}/>
    </section>


}
