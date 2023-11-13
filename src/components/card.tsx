import React from 'react';
import style from '@/styles/Card.module.css';

export default function Card(data: any) {
  return (
    <div className={`${style.card_container}`}>
      <h2 className="text-lg font-bold text-center">Escala do dia: {data?.data.dateScale}</h2>
      <div>
        <table className={style.cardTable}>
          <tbody>
            <tr>
              <td className="">Dirigente:</td>
              <td className="whitespace-nowrap">{data?.data.managerName || 'Não Informado'}</td>
            </tr>
            <tr>
              <td>Back 1:</td>
              <td className="whitespace-nowrap">{data?.data.firstBack || 'Não Informado'}</td>
            </tr>
            <tr>
              <td>Back 2:</td>
              <td className="whitespace-nowrap">{data?.data.secondBack || 'Não Informado'}</td>
            </tr>
            <tr>
              <td>Back 3:</td>
              <td className="whitespace-nowrap">{data?.data.thirdBack || 'Não Informado'}</td>
            </tr>
            <tr>
              <td>Violão:</td>
              <td className="whitespace-nowrap">{data?.data.guitarMusician || 'Não Informado'}</td>
            </tr>
            <tr>
              <td>Guitarra:</td>
              <td className="whitespace-nowrap">{data?.data.guitarristMusician || 'Não Informado'}</td>
            </tr>
            <tr>
              <td>Batera:</td>
              <td className="whitespace-nowrap">{data?.data.drumMusician || 'Não Informado'}</td>
            </tr>
            <tr>
              <td>Baixo:</td>
              <td className="whitespace-nowrap">{data?.data.bassMusician || 'Não Informado'}</td>
            </tr>
            <tr>
              <td>Teclado:</td>
              <td className="whitespace-nowrap">{data?.data.keyboardMusician || 'Não Informado'}</td>
            </tr>
            {/* Adicione mais linhas conforme necessário */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
